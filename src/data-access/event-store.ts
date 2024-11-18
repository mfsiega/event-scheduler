import { models } from "../models/models";

export interface EventStore {
    saveEvent(e: models.Event): void;
    getEvent(id: string): models.Event;
    searchEvents(): models.Event[];
}

export class InMemoryEventStore implements EventStore {
    readonly events: Map<string, models.Event>;
    constructor() {
        this.events = new Map<string, models.Event>();
    }
    getEvent(id: string): models.Event {
        if (!this.events.has(id)) {
            throw new Error(`Event ${id} not found.`);
        }
        return this.events.get(id)!;
    }

    // TODO(MFS-17): add filtering.
    searchEvents(): models.Event[] {
        const results: models.Event[] = [];
        this.events.forEach((val, _) => {
            results.push(val);
        });
        return results;
    }

    saveEvent(e: models.Event): void {
        this.events.set(e.id, e);
    }
}
