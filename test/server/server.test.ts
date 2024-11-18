import { it } from "@jest/globals";
import { expect } from "@jest/globals";
import { describe } from "@jest/globals";

import { EventSchedulerServer } from "../../src/server/server";
import { components, responses } from "../../src/api/api";
import {
    EventStore,
    InMemoryEventStore,
} from "../../src/data-access/event-store";
import { models } from "../../src/models/models";

const testCreateEvent = {
    startDate: new Date(),
    endDate: new Date(),
    name: "Test Event",
};

function eventMatches(
    e: components.Event,
    expected: { id?: string; startDate: Date; endDate: Date; name: string }
): boolean {
    if (e.name !== expected.name) return false;
    if (e.startDate !== expected.startDate) return false;
    if (e.endDate !== expected.endDate) return false;
    if (e.id === undefined) return false;
    return true;
}

function eventStoreWith(events?: models.Event[]): EventStore {
    const e = new InMemoryEventStore();
    if (!events) {
        return e;
    }
    for (const event of events) {
        e.saveEvent(event);
    }
    return e;
}

describe("Server", () => {
    describe("CreateEvent handler", () => {
        it("returns the created event", () => {
            const e = new EventSchedulerServer(eventStoreWith()).createEvent(
                testCreateEvent
            ).event;
            expect(eventMatches(e, testCreateEvent)).toBeTruthy();
        });
    });
    describe("GetEvents handler", () => {
        it("returns an event when it's in the datastore", () => {
            const events = new EventSchedulerServer(
                eventStoreWith([
                    {
                        id: "foo",
                        name: "unused",
                        startDate: new Date(),
                        endDate: new Date(),
                    },
                ])
            ).getEvents({
                id: "foo",
            }).events;
            expect(events.length).toEqual(1);
            expect(eventMatches(events[0], { ...testCreateEvent, id: "foo" }));
        });
    });
});
