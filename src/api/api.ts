export namespace components {
    export interface Event {
        id: string;
        name: string;
        startDate: Date;
        endDate: Date;
    }
}

export namespace requests {
    export interface GetEvents {
        id?: string;
        startDate?: Date;
        endDate?: Date;
    }

    export interface CreateEvent {
        startDate: Date;
        endDate: Date;
        name: string;
        allowConflict?: boolean;
    }
}

export namespace responses {
    export interface GetEvents {
        events: components.Event[];
    }

    export interface CreateEvent {
        event: components.Event;
    }
}

export interface EventScheduler {
    createEvent(r: requests.CreateEvent): responses.CreateEvent;
    getEvents(r: requests.GetEvents): responses.GetEvents;
}
