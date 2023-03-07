// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

// example:
// import { SITE_TITLE } from "../config";
// ---

// <PageLayout>
  // <PageMeta title={`${SITE_TITLE} | Web Ninja`} slot="meta" />
  // <Fragment slot="main">
//     <Intro />
//     <AboutTheTheme />
//   </Fragment>
// </PageLayout>

export const SITE_TITLE = "Thomas Vanausloos";
export const SITE_DESCRIPTION =
  "Welcome to my personal website and blog";
export const TWITTER_HANDLE = "@yourtwitterhandle";
export const MY_NAME = "Thomas Vanausloos";

// setup in astro.config.mjs
const BASE_URL = new URL(import.meta.env.SITE);
export const SITE_URL = BASE_URL.origin;
