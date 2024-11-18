import { requests, responses, components, EventScheduler } from "../api/api";
import { EventStore, InMemoryEventStore } from "../data-access/event-store";
import { v4 as uuid } from "uuid";

export class EventSchedulerServer implements EventScheduler {
    readonly e: EventStore;
    constructor(e: EventStore) {
        this.e = e;
    }

    private validateEvent(r: requests.CreateEvent): void {
        if (r.name.length === 0) {
            throw new Error("Name must have non-zero length");
        }
        if (r.endDate < r.startDate) {
            throw new Error("Start date must be before end date");
        }
    }

    createEvent(r: requests.CreateEvent): responses.CreateEvent {
        const id = uuid();
        this.validateEvent(r);
        const event = {
            id: id,
            name: r.name,
            startDate: r.startDate,
            endDate: r.endDate,
        };
        this.e.saveEvent(event);
        return { event };
    }
    getEvents(r: requests.GetEvents): responses.GetEvents {
        if (r.id) {
            return { events: [this.e.getEvent(r.id)] };
        }
        return { events: this.e.searchEvents() };
    }
}
