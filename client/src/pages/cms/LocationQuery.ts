/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LocationQuery
// ====================================================

export interface LocationQuery_cms_locations_image {
  __typename: "CmsUploadFile";
  mime: string;
  url: string;
}

export interface LocationQuery_cms_locations_hours_of_operation {
  __typename: "CmsComponentLocationComponentsHoursOfOperation";
  day_interval: string;
  opening_hours: string;
  closing_hours: string | null;
}

export interface LocationQuery_cms_locations {
  __typename: "CmsLocation";
  name: string;
  description: string;
  image: LocationQuery_cms_locations_image | null;
  hours_of_operation: (LocationQuery_cms_locations_hours_of_operation | null)[] | null;
}

export interface LocationQuery_cms {
  __typename: "CmsQuery";
  locations: (LocationQuery_cms_locations | null)[] | null;
}

export interface LocationQuery {
  /**
   * Query of cms
   */
  cms: LocationQuery_cms | null;
}

export interface LocationQueryVariables {
  slug: string;
}
