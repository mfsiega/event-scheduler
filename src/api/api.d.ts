declare namespace Components {
  namespace Schemas {
    export interface Event {
      id?: string;
      name?: string;
      startDateTime?: string; // date-time
      endDateTime?: string; // date-time
    }
  }
}
declare namespace Paths {
  namespace Events {
    namespace Get {
      namespace Parameters {
        export type EndDate = string;
        export type StartDate = string;
      }
      export interface QueryParameters {
        startDate?: Parameters.StartDate;
        endDate?: Parameters.EndDate;
      }
      namespace Responses {
        export type $200 = Components.Schemas.Event[];
      }
    }
  }
}
