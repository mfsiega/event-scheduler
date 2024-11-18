import { requests, responses, components, EventScheduler } from "../api/api";
import { EventStore, InMemoryEventStore } from "../data-access/event-store";
import { v4 as uuid } from "uuid";

export class EventSchedulerServer implements EventScheduler {
    readonly e: EventStore;
    constructor(e: EventStore) {
        this.e = e;
    }
    createEvent(r: requests.CreateEvent): responses.CreateEvent {
        const id = uuid();
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
