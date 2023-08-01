import { escape } from 'html-escaper';
/* empty css                                */import path from 'path';
import matter from 'gray-matter';
import fs from 'fs/promises';
import { globby } from 'globby';
import Markdoc from '@markdoc/markdoc';
import { z } from 'zod';
/* empty css                                    */
function baseCreateComponent(cb, moduleId) {
  cb.isAstroComponentFactory = true;
  cb.moduleId = moduleId;
  return cb;
}
function createComponentWithOptions(opts) {
  const cb = baseCreateComponent(opts.factory, opts.moduleId);
  cb.propagation = opts.propagation;
  return cb;
}
function createComponent(arg1, moduleId) {
  if (typeof arg1 === "function") {
    return baseCreateComponent(arg1, moduleId);
  } else {
    return createComponentWithOptions(arg1);
  }
}

const ASTRO_VERSION = "1.9.2";

function createDeprecatedFetchContentFn() {
  return () => {
    throw new Error("Deprecated: Astro.fetchContent() has been replaced with Astro.glob().");
  };
}
function createAstroGlobFn() {
  const globHandler = (importMetaGlobResult, globValue) => {
    let allEntries = [...Object.values(importMetaGlobResult)];
    if (allEntries.length === 0) {
      throw new Error(`Astro.glob(${JSON.stringify(globValue())}) - no matches found.`);
    }
    return Promise.all(allEntries.map((fn) => fn()));
  };
  return globHandler;
}
function createAstro(filePathname, _site, projectRootStr) {
  const site = _site ? new URL(_site) : void 0;
  const referenceURL = new URL(filePathname, `http://localhost`);
  const projectRoot = new URL(projectRootStr);
  return {
    site,
    generator: `Astro v${ASTRO_VERSION}`,
    fetchContent: createDeprecatedFetchContentFn(),
    glob: createAstroGlobFn(),
    resolve(...segments) {
      let resolved = segments.reduce((u, segment) => new URL(segment, u), referenceURL).pathname;
      if (resolved.startsWith(projectRoot.pathname)) {
        resolved = "/" + resolved.slice(projectRoot.pathname.length);
      }
      return resolved;
    }
  };
}

const escapeHTML = escape;
class HTMLString extends String {
  get [Symbol.toStringTag]() {
    return "HTMLString";
  }
}
const markHTMLString = (value) => {
  if (value instanceof HTMLString) {
    return value;
  }
  if (typeof value === "string") {
    return new HTMLString(value);
  }
  return value;
};
function isHTMLString(value) {
  return Object.prototype.toString.call(value) === "[object HTMLString]";
}

var idle_prebuilt_default = `(self.Astro=self.Astro||{}).idle=t=>{const e=async()=>{await(await t())()};"requestIdleCallback"in window?window.requestIdleCallback(e):setTimeout(e,200)},window.dispatchEvent(new Event("astro:idle"));`;

var load_prebuilt_default = `(self.Astro=self.Astro||{}).load=a=>{(async()=>await(await a())())()},window.dispatchEvent(new Event("astro:load"));`;

var media_prebuilt_default = `(self.Astro=self.Astro||{}).media=(s,a)=>{const t=async()=>{await(await s())()};if(a.value){const e=matchMedia(a.value);e.matches?t():e.addEventListener("change",t,{once:!0})}},window.dispatchEvent(new Event("astro:media"));`;

var only_prebuilt_default = `(self.Astro=self.Astro||{}).only=t=>{(async()=>await(await t())())()},window.dispatchEvent(new Event("astro:only"));`;

var visible_prebuilt_default = `(self.Astro=self.Astro||{}).visible=(s,c,n)=>{const r=async()=>{await(await s())()};let i=new IntersectionObserver(e=>{for(const t of e)if(!!t.isIntersecting){i.disconnect(),r();break}});for(let e=0;e<n.children.length;e++){const t=n.children[e];i.observe(t)}},window.dispatchEvent(new Event("astro:visible"));`;

var astro_island_prebuilt_default = `var l;{const c={0:t=>t,1:t=>JSON.parse(t,o),2:t=>new RegExp(t),3:t=>new Date(t),4:t=>new Map(JSON.parse(t,o)),5:t=>new Set(JSON.parse(t,o)),6:t=>BigInt(t),7:t=>new URL(t),8:t=>new Uint8Array(JSON.parse(t)),9:t=>new Uint16Array(JSON.parse(t)),10:t=>new Uint32Array(JSON.parse(t))},o=(t,s)=>{if(t===""||!Array.isArray(s))return s;const[e,n]=s;return e in c?c[e](n):void 0};customElements.get("astro-island")||customElements.define("astro-island",(l=class extends HTMLElement{constructor(){super(...arguments);this.hydrate=()=>{if(!this.hydrator||this.parentElement&&this.parentElement.closest("astro-island[ssr]"))return;const s=this.querySelectorAll("astro-slot"),e={},n=this.querySelectorAll("template[data-astro-template]");for(const r of n){const i=r.closest(this.tagName);!i||!i.isSameNode(this)||(e[r.getAttribute("data-astro-template")||"default"]=r.innerHTML,r.remove())}for(const r of s){const i=r.closest(this.tagName);!i||!i.isSameNode(this)||(e[r.getAttribute("name")||"default"]=r.innerHTML)}const a=this.hasAttribute("props")?JSON.parse(this.getAttribute("props"),o):{};this.hydrator(this)(this.Component,a,e,{client:this.getAttribute("client")}),this.removeAttribute("ssr"),window.removeEventListener("astro:hydrate",this.hydrate),window.dispatchEvent(new CustomEvent("astro:hydrate"))}}connectedCallback(){!this.hasAttribute("await-children")||this.firstChild?this.childrenConnectedCallback():new MutationObserver((s,e)=>{e.disconnect(),this.childrenConnectedCallback()}).observe(this,{childList:!0})}async childrenConnectedCallback(){window.addEventListener("astro:hydrate",this.hydrate);let s=this.getAttribute("before-hydration-url");s&&await import(s),this.start()}start(){const s=JSON.parse(this.getAttribute("opts")),e=this.getAttribute("client");if(Astro[e]===void 0){window.addEventListener(\`astro:\${e}\`,()=>this.start(),{once:!0});return}Astro[e](async()=>{const n=this.getAttribute("renderer-url"),[a,{default:r}]=await Promise.all([import(this.getAttribute("component-url")),n?import(n):()=>()=>{}]),i=this.getAttribute("component-export")||"default";if(!i.includes("."))this.Component=a[i];else{this.Component=a;for(const d of i.split("."))this.Component=this.Component[d]}return this.hydrator=r,this.hydrate},s,this)}attributeChangedCallback(){this.hydrator&&this.hydrate()}},l.observedAttributes=["props"],l))}`;

function determineIfNeedsHydrationScript(result) {
  if (result._metadata.hasHydrationScript) {
    return false;
  }
  return result._metadata.hasHydrationScript = true;
}
const hydrationScripts = {
  idle: idle_prebuilt_default,
  load: load_prebuilt_default,
  only: only_prebuilt_default,
  media: media_prebuilt_default,
  visible: visible_prebuilt_default
};
function determinesIfNeedsDirectiveScript(result, directive) {
  if (result._metadata.hasDirectives.has(directive)) {
    return false;
  }
  result._metadata.hasDirectives.add(directive);
  return true;
}
function getDirectiveScriptText(directive) {
  if (!(directive in hydrationScripts)) {
    throw new Error(`Unknown directive: ${directive}`);
  }
  const directiveScriptText = hydrationScripts[directive];
  return directiveScriptText;
}
function getPrescripts(type, directive) {
  switch (type) {
    case "both":
      return `<style>astro-island,astro-slot{display:contents}</style><script>${getDirectiveScriptText(directive) + astro_island_prebuilt_default}<\/script>`;
    case "directive":
      return `<script>${getDirectiveScriptText(directive)}<\/script>`;
  }
  return "";
}

const headAndContentSym = Symbol.for("astro.headAndContent");
function isHeadAndContent(obj) {
  return typeof obj === "object" && !!obj[headAndContentSym];
}

function serializeListValue(value) {
  const hash = {};
  push(value);
  return Object.keys(hash).join(" ");
  function push(item) {
    if (item && typeof item.forEach === "function")
      item.forEach(push);
    else if (item === Object(item))
      Object.keys(item).forEach((name) => {
        if (item[name])
          push(name);
      });
    else {
      item = item === false || item == null ? "" : String(item).trim();
      if (item) {
        item.split(/\s+/).forEach((name) => {
          hash[name] = true;
        });
      }
    }
  }
}
function isPromise(value) {
  return !!value && typeof value === "object" && typeof value.then === "function";
}

var _a$2;
const renderTemplateResultSym = Symbol.for("astro.renderTemplateResult");
class RenderTemplateResult {
  constructor(htmlParts, expressions) {
    this[_a$2] = true;
    this.htmlParts = htmlParts;
    this.error = void 0;
    this.expressions = expressions.map((expression) => {
      if (isPromise(expression)) {
        return Promise.resolve(expression).catch((err) => {
          if (!this.error) {
            this.error = err;
            throw err;
          }
        });
      }
      return expression;
    });
  }
  get [(_a$2 = renderTemplateResultSym, Symbol.toStringTag)]() {
    return "AstroComponent";
  }
  async *[Symbol.asyncIterator]() {
    const { htmlParts, expressions } = this;
    for (let i = 0; i < htmlParts.length; i++) {
      const html = htmlParts[i];
      const expression = expressions[i];
      yield markHTMLString(html);
      yield* renderChild(expression);
    }
  }
}
function isRenderTemplateResult(obj) {
  return typeof obj === "object" && !!obj[renderTemplateResultSym];
}
async function* renderAstroTemplateResult(component) {
  for await (const value of component) {
    if (value || value === 0) {
      for await (const chunk of renderChild(value)) {
        switch (chunk.type) {
          case "directive": {
            yield chunk;
            break;
          }
          default: {
            yield markHTMLString(chunk);
            break;
          }
        }
      }
    }
  }
}
function renderTemplate(htmlParts, ...expressions) {
  return new RenderTemplateResult(htmlParts, expressions);
}

function isAstroComponentFactory(obj) {
  return obj == null ? false : obj.isAstroComponentFactory === true;
}
async function renderToString(result, componentFactory, props, children) {
  const factoryResult = await componentFactory(result, props, children);
  if (factoryResult instanceof Response) {
    const response = factoryResult;
    throw response;
  }
  let parts = new HTMLParts();
  const templateResult = isHeadAndContent(factoryResult) ? factoryResult.content : factoryResult;
  for await (const chunk of renderAstroTemplateResult(templateResult)) {
    parts.append(chunk, result);
  }
  return parts.toString();
}
function isAPropagatingComponent(result, factory) {
  let hint = factory.propagation || "none";
  if (factory.moduleId && result.propagation.has(factory.moduleId) && hint === "none") {
    hint = result.propagation.get(factory.moduleId);
  }
  return hint === "in-tree" || hint === "self";
}

const defineErrors = (errs) => errs;
const AstroErrorData = defineErrors({
  UnknownCompilerError: {
    title: "Unknown compiler error.",
    code: 1e3
  },
  StaticRedirectNotAvailable: {
    title: "`Astro.redirect` is not available in static mode.",
    code: 3001,
    message: "Redirects are only available when using `output: 'server'`. Update your Astro config if you need SSR features.",
    hint: "See https://docs.astro.build/en/guides/server-side-rendering/#enabling-ssr-in-your-project for more information on how to enable SSR."
  },
  ClientAddressNotAvailable: {
    title: "`Astro.clientAddress` is not available in current adapter.",
    code: 3002,
    message: (adapterName) => `\`Astro.clientAddress\` is not available in the \`${adapterName}\` adapter. File an issue with the adapter to add support.`
  },
  StaticClientAddressNotAvailable: {
    title: "`Astro.clientAddress` is not available in static mode.",
    code: 3003,
    message: "`Astro.clientAddress` is only available when using `output: 'server'`. Update your Astro config if you need SSR features.",
    hint: "See https://docs.astro.build/en/guides/server-side-rendering/#enabling-ssr-in-your-project for more information on how to enable SSR."
  },
  NoMatchingStaticPathFound: {
    title: "No static path found for requested path.",
    code: 3004,
    message: (pathName) => `A \`getStaticPaths()\` route pattern was matched, but no matching static path was found for requested path \`${pathName}\`.`,
    hint: (possibleRoutes) => `Possible dynamic routes being matched: ${possibleRoutes.join(", ")}.`
  },
  OnlyResponseCanBeReturned: {
    title: "Invalid type returned by Astro page.",
    code: 3005,
    message: (route, returnedValue) => `Route \`${route ? route : ""}\` returned a \`${returnedValue}\`. Only a [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) can be returned from Astro files.`,
    hint: "See https://docs.astro.build/en/guides/server-side-rendering/#response for more information."
  },
  MissingMediaQueryDirective: {
    title: "Missing value for `client:media` directive.",
    code: 3006,
    message: 'Media query not provided for `client:media` directive. A media query similar to `client:media="(max-width: 600px)"` must be provided'
  },
  NoMatchingRenderer: {
    title: "No matching renderer found.",
    code: 3007,
    message: (componentName, componentExtension, plural, validRenderersCount) => `Unable to render \`${componentName}\`.

${validRenderersCount > 0 ? `There ${plural ? "are." : "is."} ${validRenderersCount} renderer${plural ? "s." : ""} configured in your \`astro.config.mjs\` file,
but ${plural ? "none were." : "it was not."} able to server-side render \`${componentName}\`.` : `No valid renderer was found ${componentExtension ? `for the \`.${componentExtension}\` file extension.` : `for this file extension.`}`}`,
    hint: (probableRenderers) => `Did you mean to enable the ${probableRenderers} integration?

See https://docs.astro.build/en/core-concepts/framework-components/ for more information on how to install and configure integrations.`
  },
  NoClientEntrypoint: {
    title: "No client entrypoint specified in renderer.",
    code: 3008,
    message: (componentName, clientDirective, rendererName) => `\`${componentName}\` component has a \`client:${clientDirective}\` directive, but no client entrypoint was provided by \`${rendererName}\`.`,
    hint: "See https://docs.astro.build/en/reference/integrations-reference/#addrenderer-option for more information on how to configure your renderer."
  },
  NoClientOnlyHint: {
    title: "Missing hint on client:only directive.",
    code: 3009,
    message: (componentName) => `Unable to render \`${componentName}\`. When using the \`client:only\` hydration strategy, Astro needs a hint to use the correct renderer.`,
    hint: (probableRenderers) => `Did you mean to pass \`client:only="${probableRenderers}"\`? See https://docs.astro.build/en/reference/directives-reference/#clientonly for more information on client:only`
  },
  InvalidGetStaticPathParam: {
    title: "Invalid value returned by a `getStaticPaths` path.",
    code: 3010,
    message: (paramType) => `Invalid params given to \`getStaticPaths\` path. Expected an \`object\`, got \`${paramType}\``,
    hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
  },
  InvalidGetStaticPathsReturn: {
    title: "Invalid value returned by getStaticPaths.",
    code: 3011,
    message: (returnType) => `Invalid type returned by \`getStaticPaths\`. Expected an \`array\`, got \`${returnType}\``,
    hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
  },
  GetStaticPathsRemovedRSSHelper: {
    title: "getStaticPaths RSS helper is not available anymore.",
    code: 3012,
    message: "The RSS helper has been removed from `getStaticPaths`. Try the new @astrojs/rss package instead.",
    hint: "See https://docs.astro.build/en/guides/rss/ for more information."
  },
  GetStaticPathsExpectedParams: {
    title: "Missing params property on `getStaticPaths` route.",
    code: 3013,
    message: "Missing or empty required `params` property on `getStaticPaths` route.",
    hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
  },
  GetStaticPathsInvalidRouteParam: {
    title: "Invalid value for `getStaticPaths` route parameter.",
    code: 3014,
    message: (key, value, valueType) => `Invalid getStaticPaths route parameter for \`${key}\`. Expected undefined, a string or a number, received \`${valueType}\` (\`${value}\`)`,
    hint: "See https://docs.astro.build/en/reference/api-reference/#getstaticpaths for more information on getStaticPaths."
  },
  GetStaticPathsRequired: {
    title: "`getStaticPaths()` function required for dynamic routes.",
    code: 3015,
    message: "`getStaticPaths()` function is required for dynamic routes. Make sure that you `export` a `getStaticPaths` function from your dynamic route.",
    hint: `See https://docs.astro.build/en/core-concepts/routing/#dynamic-routes for more information on dynamic routes.

Alternatively, set \`output: "server"\` in your Astro config file to switch to a non-static server build.
See https://docs.astro.build/en/guides/server-side-rendering/ for more information on non-static rendering.`
  },
  ReservedSlotName: {
    title: "Invalid slot name.",
    code: 3016,
    message: (slotName) => `Unable to create a slot named \`${slotName}\`. \`${slotName}\` is a reserved slot name. Please update the name of this slot.`
  },
  NoAdapterInstalled: {
    title: "Cannot use Server-side Rendering without an adapter.",
    code: 3017,
    message: `Cannot use \`output: 'server'\` without an adapter. Please install and configure the appropriate server adapter for your final deployment.`,
    hint: "See https://docs.astro.build/en/guides/server-side-rendering/ for more information."
  },
  NoMatchingImport: {
    title: "No import found for component.",
    code: 3018,
    message: (componentName) => `Could not render \`${componentName}\`. No matching import has been found for \`${componentName}\`.`,
    hint: "Please make sure the component is properly imported."
  },
  InvalidPrerenderExport: {
    title: "Invalid prerender export.",
    code: 3019,
    message: (prefix, suffix) => {
      let msg = `A \`prerender\` export has been detected, but its value cannot be statically analyzed.`;
      if (prefix !== "const")
        msg += `
Expected \`const\` declaration but got \`${prefix}\`.`;
      if (suffix !== "true")
        msg += `
Expected \`true\` value but got \`${suffix}\`.`;
      return msg;
    },
    hint: "Mutable values declared at runtime are not supported. Please make sure to use exactly `export const prerender = true`."
  },
  UnknownViteError: {
    title: "Unknown Vite Error.",
    code: 4e3
  },
  FailedToLoadModuleSSR: {
    title: "Could not import file.",
    code: 4001,
    message: (importName) => `Could not import \`${importName}\`.`,
    hint: "This is often caused by a typo in the import path. Please make sure the file exists."
  },
  InvalidGlob: {
    title: "Invalid glob pattern.",
    code: 4002,
    message: (globPattern) => `Invalid glob pattern: \`${globPattern}\`. Glob patterns must start with './', '../' or '/'.`,
    hint: "See https://docs.astro.build/en/guides/imports/#glob-patterns for more information on supported glob patterns."
  },
  UnknownCSSError: {
    title: "Unknown CSS Error.",
    code: 5e3
  },
  CSSSyntaxError: {
    title: "CSS Syntax Error.",
    code: 5001
  },
  UnknownMarkdownError: {
    title: "Unknown Markdown Error.",
    code: 6e3
  },
  MarkdownFrontmatterParseError: {
    title: "Failed to parse Markdown frontmatter.",
    code: 6001
  },
  MarkdownContentSchemaValidationError: {
    title: "Content collection frontmatter invalid.",
    code: 6002,
    message: (collection, entryId, error) => {
      return [
        `${String(collection)} \u2192 ${String(entryId)} frontmatter does not match collection schema.`,
        ...error.errors.map((zodError) => zodError.message)
      ].join("\n");
    },
    hint: "See https://docs.astro.build/en/guides/content-collections/ for more information on content schemas."
  },
  UnknownConfigError: {
    title: "Unknown configuration error.",
    code: 7e3
  },
  ConfigNotFound: {
    title: "Specified configuration file not found.",
    code: 7001,
    message: (configFile) => `Unable to resolve \`--config "${configFile}"\`. Does the file exist?`
  },
  ConfigLegacyKey: {
    title: "Legacy configuration detected.",
    code: 7002,
    message: (legacyConfigKey) => `Legacy configuration detected: \`${legacyConfigKey}\`.`,
    hint: "Please update your configuration to the new format.\nSee https://astro.build/config for more information."
  },
  UnknownCLIError: {
    title: "Unknown CLI Error.",
    code: 8e3
  },
  GenerateContentTypesError: {
    title: "Failed to generate content types.",
    code: 8001,
    message: "`astro sync` command failed to generate content collection types.",
    hint: "Check your `src/content/config.*` file for typos."
  },
  UnknownError: {
    title: "Unknown Error.",
    code: 99999
  }
});

function normalizeLF(code) {
  return code.replace(/\r\n|\r(?!\n)|\n/g, "\n");
}
function getErrorDataByCode(code) {
  const entry = Object.entries(AstroErrorData).find((data) => data[1].code === code);
  if (entry) {
    return {
      name: entry[0],
      data: entry[1]
    };
  }
}

function codeFrame(src, loc) {
  if (!loc || loc.line === void 0 || loc.column === void 0) {
    return "";
  }
  const lines = normalizeLF(src).split("\n").map((ln) => ln.replace(/\t/g, "  "));
  const visibleLines = [];
  for (let n = -2; n <= 2; n++) {
    if (lines[loc.line + n])
      visibleLines.push(loc.line + n);
  }
  let gutterWidth = 0;
  for (const lineNo of visibleLines) {
    let w = `> ${lineNo}`;
    if (w.length > gutterWidth)
      gutterWidth = w.length;
  }
  let output = "";
  for (const lineNo of visibleLines) {
    const isFocusedLine = lineNo === loc.line - 1;
    output += isFocusedLine ? "> " : "  ";
    output += `${lineNo + 1} | ${lines[lineNo]}
`;
    if (isFocusedLine)
      output += `${Array.from({ length: gutterWidth }).join(" ")}  | ${Array.from({
        length: loc.column
      }).join(" ")}^
`;
  }
  return output;
}

class AstroError extends Error {
  constructor(props, ...params) {
    var _a;
    super(...params);
    this.type = "AstroError";
    const { code, name, title, message, stack, location, hint, frame } = props;
    this.errorCode = code;
    if (name && name !== "Error") {
      this.name = name;
    } else {
      this.name = ((_a = getErrorDataByCode(this.errorCode)) == null ? void 0 : _a.name) ?? "UnknownError";
    }
    this.title = title;
    if (message)
      this.message = message;
    this.stack = stack ? stack : this.stack;
    this.loc = location;
    this.hint = hint;
    this.frame = frame;
  }
  setErrorCode(errorCode) {
    this.errorCode = errorCode;
  }
  setLocation(location) {
    this.loc = location;
  }
  setName(name) {
    this.name = name;
  }
  setMessage(message) {
    this.message = message;
  }
  setHint(hint) {
    this.hint = hint;
  }
  setFrame(source, location) {
    this.frame = codeFrame(source, location);
  }
  static is(err) {
    return err.type === "AstroError";
  }
}

const PROP_TYPE = {
  Value: 0,
  JSON: 1,
  RegExp: 2,
  Date: 3,
  Map: 4,
  Set: 5,
  BigInt: 6,
  URL: 7,
  Uint8Array: 8,
  Uint16Array: 9,
  Uint32Array: 10
};
function serializeArray(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  if (parents.has(value)) {
    throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  }
  parents.add(value);
  const serialized = value.map((v) => {
    return convertToSerializedForm(v, metadata, parents);
  });
  parents.delete(value);
  return serialized;
}
function serializeObject(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  if (parents.has(value)) {
    throw new Error(`Cyclic reference detected while serializing props for <${metadata.displayName} client:${metadata.hydrate}>!

Cyclic references cannot be safely serialized for client-side usage. Please remove the cyclic reference.`);
  }
  parents.add(value);
  const serialized = Object.fromEntries(
    Object.entries(value).map(([k, v]) => {
      return [k, convertToSerializedForm(v, metadata, parents)];
    })
  );
  parents.delete(value);
  return serialized;
}
function convertToSerializedForm(value, metadata = {}, parents = /* @__PURE__ */ new WeakSet()) {
  const tag = Object.prototype.toString.call(value);
  switch (tag) {
    case "[object Date]": {
      return [PROP_TYPE.Date, value.toISOString()];
    }
    case "[object RegExp]": {
      return [PROP_TYPE.RegExp, value.source];
    }
    case "[object Map]": {
      return [
        PROP_TYPE.Map,
        JSON.stringify(serializeArray(Array.from(value), metadata, parents))
      ];
    }
    case "[object Set]": {
      return [
        PROP_TYPE.Set,
        JSON.stringify(serializeArray(Array.from(value), metadata, parents))
      ];
    }
    case "[object BigInt]": {
      return [PROP_TYPE.BigInt, value.toString()];
    }
    case "[object URL]": {
      return [PROP_TYPE.URL, value.toString()];
    }
    case "[object Array]": {
      return [PROP_TYPE.JSON, JSON.stringify(serializeArray(value, metadata, parents))];
    }
    case "[object Uint8Array]": {
      return [PROP_TYPE.Uint8Array, JSON.stringify(Array.from(value))];
    }
    case "[object Uint16Array]": {
      return [PROP_TYPE.Uint16Array, JSON.stringify(Array.from(value))];
    }
    case "[object Uint32Array]": {
      return [PROP_TYPE.Uint32Array, JSON.stringify(Array.from(value))];
    }
    default: {
      if (value !== null && typeof value === "object") {
        return [PROP_TYPE.Value, serializeObject(value, metadata, parents)];
      } else {
        return [PROP_TYPE.Value, value];
      }
    }
  }
}
function serializeProps(props, metadata) {
  const serialized = JSON.stringify(serializeObject(props, metadata));
  return serialized;
}

const HydrationDirectivesRaw = ["load", "idle", "media", "visible", "only"];
const HydrationDirectives = new Set(HydrationDirectivesRaw);
const HydrationDirectiveProps = new Set(HydrationDirectivesRaw.map((n) => `client:${n}`));
function extractDirectives(displayName, inputProps) {
  let extracted = {
    isPage: false,
    hydration: null,
    props: {}
  };
  for (const [key, value] of Object.entries(inputProps)) {
    if (key.startsWith("server:")) {
      if (key === "server:root") {
        extracted.isPage = true;
      }
    }
    if (key.startsWith("client:")) {
      if (!extracted.hydration) {
        extracted.hydration = {
          directive: "",
          value: "",
          componentUrl: "",
          componentExport: { value: "" }
        };
      }
      switch (key) {
        case "client:component-path": {
          extracted.hydration.componentUrl = value;
          break;
        }
        case "client:component-export": {
          extracted.hydration.componentExport.value = value;
          break;
        }
        case "client:component-hydration": {
          break;
        }
        case "client:display-name": {
          break;
        }
        default: {
          extracted.hydration.directive = key.split(":")[1];
          extracted.hydration.value = value;
          if (!HydrationDirectives.has(extracted.hydration.directive)) {
            throw new Error(
              `Error: invalid hydration directive "${key}". Supported hydration methods: ${Array.from(
                HydrationDirectiveProps
              ).join(", ")}`
            );
          }
          if (extracted.hydration.directive === "media" && typeof extracted.hydration.value !== "string") {
            throw new AstroError(AstroErrorData.MissingMediaQueryDirective);
          }
          break;
        }
      }
    } else if (key === "class:list") {
      if (value) {
        extracted.props[key.slice(0, -5)] = serializeListValue(value);
      }
    } else {
      extracted.props[key] = value;
    }
  }
  for (const sym of Object.getOwnPropertySymbols(inputProps)) {
    extracted.props[sym] = inputProps[sym];
  }
  return extracted;
}
async function generateHydrateScript(scriptOptions, metadata) {
  const { renderer, result, astroId, props, attrs } = scriptOptions;
  const { hydrate, componentUrl, componentExport } = metadata;
  if (!componentExport.value) {
    throw new Error(
      `Unable to resolve a valid export for "${metadata.displayName}"! Please open an issue at https://astro.build/issues!`
    );
  }
  const island = {
    children: "",
    props: {
      uid: astroId
    }
  };
  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      island.props[key] = escapeHTML(value);
    }
  }
  island.props["component-url"] = await result.resolve(decodeURI(componentUrl));
  if (renderer.clientEntrypoint) {
    island.props["component-export"] = componentExport.value;
    island.props["renderer-url"] = await result.resolve(decodeURI(renderer.clientEntrypoint));
    island.props["props"] = escapeHTML(serializeProps(props, metadata));
  }
  island.props["ssr"] = "";
  island.props["client"] = hydrate;
  let beforeHydrationUrl = await result.resolve("astro:scripts/before-hydration.js");
  if (beforeHydrationUrl.length) {
    island.props["before-hydration-url"] = beforeHydrationUrl;
  }
  island.props["opts"] = escapeHTML(
    JSON.stringify({
      name: metadata.displayName,
      value: metadata.hydrateArgs || ""
    })
  );
  return island;
}

var _a$1;
const astroComponentInstanceSym = Symbol.for("astro.componentInstance");
class AstroComponentInstance {
  constructor(result, props, slots, factory) {
    this[_a$1] = true;
    this.result = result;
    this.props = props;
    this.factory = factory;
    this.slotValues = {};
    for (const name in slots) {
      this.slotValues[name] = slots[name]();
    }
  }
  async init() {
    this.returnValue = this.factory(this.result, this.props, this.slotValues);
    return this.returnValue;
  }
  async *render() {
    if (this.returnValue === void 0) {
      await this.init();
    }
    let value = this.returnValue;
    if (isPromise(value)) {
      value = await value;
    }
    if (isHeadAndContent(value)) {
      yield* value.content;
    } else {
      yield* renderChild(value);
    }
  }
}
_a$1 = astroComponentInstanceSym;
function validateComponentProps(props, displayName) {
  if (props != null) {
    for (const prop of Object.keys(props)) {
      if (HydrationDirectiveProps.has(prop)) {
        console.warn(
          `You are attempting to render <${displayName} ${prop} />, but ${displayName} is an Astro component. Astro components do not render in the client and should not have a hydration directive. Please use a framework component for client rendering.`
        );
      }
    }
  }
}
function createAstroComponentInstance(result, displayName, factory, props, slots = {}) {
  validateComponentProps(props, displayName);
  const instance = new AstroComponentInstance(result, props, slots, factory);
  if (isAPropagatingComponent(result, factory) && !result.propagators.has(factory)) {
    result.propagators.set(factory, instance);
  }
  return instance;
}
function isAstroComponentInstance(obj) {
  return typeof obj === "object" && !!obj[astroComponentInstanceSym];
}

async function* renderChild(child) {
  child = await child;
  if (child instanceof SlotString) {
    if (child.instructions) {
      yield* child.instructions;
    }
    yield child;
  } else if (isHTMLString(child)) {
    yield child;
  } else if (Array.isArray(child)) {
    for (const value of child) {
      yield markHTMLString(await renderChild(value));
    }
  } else if (typeof child === "function") {
    yield* renderChild(child());
  } else if (typeof child === "string") {
    yield markHTMLString(escapeHTML(child));
  } else if (!child && child !== 0) ; else if (isRenderTemplateResult(child)) {
    yield* renderAstroTemplateResult(child);
  } else if (isAstroComponentInstance(child)) {
    yield* child.render();
  } else if (ArrayBuffer.isView(child)) {
    yield child;
  } else if (typeof child === "object" && (Symbol.asyncIterator in child || Symbol.iterator in child)) {
    yield* child;
  } else {
    yield child;
  }
}

const slotString = Symbol.for("astro:slot-string");
class SlotString extends HTMLString {
  constructor(content, instructions) {
    super(content);
    this.instructions = instructions;
    this[slotString] = true;
  }
}
function isSlotString(str) {
  return !!str[slotString];
}
async function renderSlot(_result, slotted, fallback) {
  if (slotted) {
    let iterator = renderChild(slotted);
    let content = "";
    let instructions = null;
    for await (const chunk of iterator) {
      if (chunk.type === "directive") {
        if (instructions === null) {
          instructions = [];
        }
        instructions.push(chunk);
      } else {
        content += chunk;
      }
    }
    return markHTMLString(new SlotString(content, instructions));
  }
  return fallback;
}
async function renderSlots(result, slots = {}) {
  let slotInstructions = null;
  let children = {};
  if (slots) {
    await Promise.all(
      Object.entries(slots).map(
        ([key, value]) => renderSlot(result, value).then((output) => {
          if (output.instructions) {
            if (slotInstructions === null) {
              slotInstructions = [];
            }
            slotInstructions.push(...output.instructions);
          }
          children[key] = output;
        })
      )
    );
  }
  return { slotInstructions, children };
}

const Fragment = Symbol.for("astro:fragment");
const Renderer = Symbol.for("astro:renderer");
const encoder = new TextEncoder();
const decoder = new TextDecoder();
function stringifyChunk(result, chunk) {
  switch (chunk.type) {
    case "directive": {
      const { hydration } = chunk;
      let needsHydrationScript = hydration && determineIfNeedsHydrationScript(result);
      let needsDirectiveScript = hydration && determinesIfNeedsDirectiveScript(result, hydration.directive);
      let prescriptType = needsHydrationScript ? "both" : needsDirectiveScript ? "directive" : null;
      if (prescriptType) {
        let prescripts = getPrescripts(prescriptType, hydration.directive);
        return markHTMLString(prescripts);
      } else {
        return "";
      }
    }
    default: {
      if (isSlotString(chunk)) {
        let out = "";
        const c = chunk;
        if (c.instructions) {
          for (const instr of c.instructions) {
            out += stringifyChunk(result, instr);
          }
        }
        out += chunk.toString();
        return out;
      }
      return chunk.toString();
    }
  }
}
class HTMLParts {
  constructor() {
    this.parts = "";
  }
  append(part, result) {
    if (ArrayBuffer.isView(part)) {
      this.parts += decoder.decode(part);
    } else {
      this.parts += stringifyChunk(result, part);
    }
  }
  toString() {
    return this.parts;
  }
  toArrayBuffer() {
    return encoder.encode(this.parts);
  }
}

const ClientOnlyPlaceholder = "astro-client-only";
class Skip {
  constructor(vnode) {
    this.vnode = vnode;
    this.count = 0;
  }
  increment() {
    this.count++;
  }
  haveNoTried() {
    return this.count === 0;
  }
  isCompleted() {
    return this.count > 2;
  }
}
Skip.symbol = Symbol("astro:jsx:skip");
let originalConsoleError;
let consoleFilterRefs = 0;
async function renderJSX(result, vnode) {
  switch (true) {
    case vnode instanceof HTMLString:
      if (vnode.toString().trim() === "") {
        return "";
      }
      return vnode;
    case typeof vnode === "string":
      return markHTMLString(escapeHTML(vnode));
    case typeof vnode === "function":
      return vnode;
    case (!vnode && vnode !== 0):
      return "";
    case Array.isArray(vnode):
      return markHTMLString(
        (await Promise.all(vnode.map((v) => renderJSX(result, v)))).join("")
      );
  }
  let skip;
  if (vnode.props) {
    if (vnode.props[Skip.symbol]) {
      skip = vnode.props[Skip.symbol];
    } else {
      skip = new Skip(vnode);
    }
  } else {
    skip = new Skip(vnode);
  }
  return renderJSXVNode(result, vnode, skip);
}
async function renderJSXVNode(result, vnode, skip) {
  if (isVNode(vnode)) {
    switch (true) {
      case !vnode.type: {
        throw new Error(`Unable to render ${result._metadata.pathname} because it contains an undefined Component!
Did you forget to import the component or is it possible there is a typo?`);
      }
      case vnode.type === Symbol.for("astro:fragment"):
        return renderJSX(result, vnode.props.children);
      case vnode.type.isAstroComponentFactory: {
        let props = {};
        let slots = {};
        for (const [key, value] of Object.entries(vnode.props ?? {})) {
          if (key === "children" || value && typeof value === "object" && value["$$slot"]) {
            slots[key === "children" ? "default" : key] = () => renderJSX(result, value);
          } else {
            props[key] = value;
          }
        }
        return markHTMLString(await renderToString(result, vnode.type, props, slots));
      }
      case (!vnode.type && vnode.type !== 0):
        return "";
      case (typeof vnode.type === "string" && vnode.type !== ClientOnlyPlaceholder):
        return markHTMLString(await renderElement$1(result, vnode.type, vnode.props ?? {}));
    }
    if (vnode.type) {
      let extractSlots2 = function(child) {
        if (Array.isArray(child)) {
          return child.map((c) => extractSlots2(c));
        }
        if (!isVNode(child)) {
          _slots.default.push(child);
          return;
        }
        if ("slot" in child.props) {
          _slots[child.props.slot] = [..._slots[child.props.slot] ?? [], child];
          delete child.props.slot;
          return;
        }
        _slots.default.push(child);
      };
      if (typeof vnode.type === "function" && vnode.type["astro:renderer"]) {
        skip.increment();
      }
      if (typeof vnode.type === "function" && vnode.props["server:root"]) {
        const output2 = await vnode.type(vnode.props ?? {});
        return await renderJSX(result, output2);
      }
      if (typeof vnode.type === "function") {
        if (skip.haveNoTried() || skip.isCompleted()) {
          useConsoleFilter();
          try {
            const output2 = await vnode.type(vnode.props ?? {});
            let renderResult;
            if (output2 && output2[AstroJSX]) {
              renderResult = await renderJSXVNode(result, output2, skip);
              return renderResult;
            } else if (!output2) {
              renderResult = await renderJSXVNode(result, output2, skip);
              return renderResult;
            }
          } catch (e) {
            if (skip.isCompleted()) {
              throw e;
            }
            skip.increment();
          } finally {
            finishUsingConsoleFilter();
          }
        } else {
          skip.increment();
        }
      }
      const { children = null, ...props } = vnode.props ?? {};
      const _slots = {
        default: []
      };
      extractSlots2(children);
      for (const [key, value] of Object.entries(props)) {
        if (value["$$slot"]) {
          _slots[key] = value;
          delete props[key];
        }
      }
      const slotPromises = [];
      const slots = {};
      for (const [key, value] of Object.entries(_slots)) {
        slotPromises.push(
          renderJSX(result, value).then((output2) => {
            if (output2.toString().trim().length === 0)
              return;
            slots[key] = () => output2;
          })
        );
      }
      await Promise.all(slotPromises);
      props[Skip.symbol] = skip;
      let output;
      if (vnode.type === ClientOnlyPlaceholder && vnode.props["client:only"]) {
        output = await renderComponentToIterable(
          result,
          vnode.props["client:display-name"] ?? "",
          null,
          props,
          slots
        );
      } else {
        output = await renderComponentToIterable(
          result,
          typeof vnode.type === "function" ? vnode.type.name : vnode.type,
          vnode.type,
          props,
          slots
        );
      }
      if (typeof output !== "string" && Symbol.asyncIterator in output) {
        let parts = new HTMLParts();
        for await (const chunk of output) {
          parts.append(chunk, result);
        }
        return markHTMLString(parts.toString());
      } else {
        return markHTMLString(output);
      }
    }
  }
  return markHTMLString(`${vnode}`);
}
async function renderElement$1(result, tag, { children, ...props }) {
  return markHTMLString(
    `<${tag}${spreadAttributes(props)}${markHTMLString(
      (children == null || children == "") && voidElementNames.test(tag) ? `/>` : `>${children == null ? "" : await renderJSX(result, children)}</${tag}>`
    )}`
  );
}
function useConsoleFilter() {
  consoleFilterRefs++;
  if (!originalConsoleError) {
    originalConsoleError = console.error;
    try {
      console.error = filteredConsoleError;
    } catch (error) {
    }
  }
}
function finishUsingConsoleFilter() {
  consoleFilterRefs--;
}
function filteredConsoleError(msg, ...rest) {
  if (consoleFilterRefs > 0 && typeof msg === "string") {
    const isKnownReactHookError = msg.includes("Warning: Invalid hook call.") && msg.includes("https://reactjs.org/link/invalid-hook-call");
    if (isKnownReactHookError)
      return;
  }
  originalConsoleError(msg, ...rest);
}

/**
 * shortdash - https://github.com/bibig/node-shorthash
 *
 * @license
 *
 * (The MIT License)
 *
 * Copyright (c) 2013 Bibig <bibig@me.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
const dictionary = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY";
const binary = dictionary.length;
function bitwise(str) {
  let hash = 0;
  if (str.length === 0)
    return hash;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    hash = (hash << 5) - hash + ch;
    hash = hash & hash;
  }
  return hash;
}
function shorthash(text) {
  let num;
  let result = "";
  let integer = bitwise(text);
  const sign = integer < 0 ? "Z" : "";
  integer = Math.abs(integer);
  while (integer >= binary) {
    num = integer % binary;
    integer = Math.floor(integer / binary);
    result = dictionary[num] + result;
  }
  if (integer > 0) {
    result = dictionary[integer] + result;
  }
  return sign + result;
}

const voidElementNames = /^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i;
const htmlBooleanAttributes = /^(allowfullscreen|async|autofocus|autoplay|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|hidden|loop|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|itemscope)$/i;
const htmlEnumAttributes = /^(contenteditable|draggable|spellcheck|value)$/i;
const svgEnumAttributes = /^(autoReverse|externalResourcesRequired|focusable|preserveAlpha)$/i;
const STATIC_DIRECTIVES = /* @__PURE__ */ new Set(["set:html", "set:text"]);
const toIdent = (k) => k.trim().replace(/(?:(?!^)\b\w|\s+|[^\w]+)/g, (match, index) => {
  if (/[^\w]|\s/.test(match))
    return "";
  return index === 0 ? match : match.toUpperCase();
});
const toAttributeString = (value, shouldEscape = true) => shouldEscape ? String(value).replace(/&/g, "&#38;").replace(/"/g, "&#34;") : value;
const kebab = (k) => k.toLowerCase() === k ? k : k.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
const toStyleString = (obj) => Object.entries(obj).map(([k, v]) => `${kebab(k)}:${v}`).join(";");
function defineScriptVars(vars) {
  let output = "";
  for (const [key, value] of Object.entries(vars)) {
    output += `const ${toIdent(key)} = ${JSON.stringify(value)};
`;
  }
  return markHTMLString(output);
}
function formatList(values) {
  if (values.length === 1) {
    return values[0];
  }
  return `${values.slice(0, -1).join(", ")} or ${values[values.length - 1]}`;
}
function addAttribute(value, key, shouldEscape = true) {
  if (value == null) {
    return "";
  }
  if (value === false) {
    if (htmlEnumAttributes.test(key) || svgEnumAttributes.test(key)) {
      return markHTMLString(` ${key}="false"`);
    }
    return "";
  }
  if (STATIC_DIRECTIVES.has(key)) {
    console.warn(`[astro] The "${key}" directive cannot be applied dynamically at runtime. It will not be rendered as an attribute.

Make sure to use the static attribute syntax (\`${key}={value}\`) instead of the dynamic spread syntax (\`{...{ "${key}": value }}\`).`);
    return "";
  }
  if (key === "class:list") {
    const listValue = toAttributeString(serializeListValue(value), shouldEscape);
    if (listValue === "") {
      return "";
    }
    return markHTMLString(` ${key.slice(0, -5)}="${listValue}"`);
  }
  if (key === "style" && !(value instanceof HTMLString) && typeof value === "object") {
    return markHTMLString(` ${key}="${toAttributeString(toStyleString(value), shouldEscape)}"`);
  }
  if (key === "className") {
    return markHTMLString(` class="${toAttributeString(value, shouldEscape)}"`);
  }
  if (value === true && (key.startsWith("data-") || htmlBooleanAttributes.test(key))) {
    return markHTMLString(` ${key}`);
  } else {
    return markHTMLString(` ${key}="${toAttributeString(value, shouldEscape)}"`);
  }
}
function internalSpreadAttributes(values, shouldEscape = true) {
  let output = "";
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, shouldEscape);
  }
  return markHTMLString(output);
}
function renderElement(name, { props: _props, children = "" }, shouldEscape = true) {
  const { lang: _, "data-astro-id": astroId, "define:vars": defineVars, ...props } = _props;
  if (defineVars) {
    if (name === "style") {
      delete props["is:global"];
      delete props["is:scoped"];
    }
    if (name === "script") {
      delete props.hoist;
      children = defineScriptVars(defineVars) + "\n" + children;
    }
  }
  if ((children == null || children == "") && voidElementNames.test(name)) {
    return `<${name}${internalSpreadAttributes(props, shouldEscape)} />`;
  }
  return `<${name}${internalSpreadAttributes(props, shouldEscape)}>${children}</${name}>`;
}

function componentIsHTMLElement(Component) {
  return typeof HTMLElement !== "undefined" && HTMLElement.isPrototypeOf(Component);
}
async function renderHTMLElement(result, constructor, props, slots) {
  const name = getHTMLElementName(constructor);
  let attrHTML = "";
  for (const attr in props) {
    attrHTML += ` ${attr}="${toAttributeString(await props[attr])}"`;
  }
  return markHTMLString(
    `<${name}${attrHTML}>${await renderSlot(result, slots == null ? void 0 : slots.default)}</${name}>`
  );
}
function getHTMLElementName(constructor) {
  const definedName = customElements.getName(constructor);
  if (definedName)
    return definedName;
  const assignedName = constructor.name.replace(/^HTML|Element$/g, "").replace(/[A-Z]/g, "-$&").toLowerCase().replace(/^-/, "html-");
  return assignedName;
}

const rendererAliases = /* @__PURE__ */ new Map([["solid", "solid-js"]]);
function guessRenderers(componentUrl) {
  const extname = componentUrl == null ? void 0 : componentUrl.split(".").pop();
  switch (extname) {
    case "svelte":
      return ["@astrojs/svelte"];
    case "vue":
      return ["@astrojs/vue"];
    case "jsx":
    case "tsx":
      return ["@astrojs/react", "@astrojs/preact", "@astrojs/solid", "@astrojs/vue (jsx)"];
    default:
      return [
        "@astrojs/react",
        "@astrojs/preact",
        "@astrojs/solid",
        "@astrojs/vue",
        "@astrojs/svelte"
      ];
  }
}
function isFragmentComponent(Component) {
  return Component === Fragment;
}
function isHTMLComponent(Component) {
  return Component && typeof Component === "object" && Component["astro:html"];
}
async function renderFrameworkComponent(result, displayName, Component, _props, slots = {}) {
  var _a, _b;
  if (!Component && !_props["client:only"]) {
    throw new Error(
      `Unable to render ${displayName} because it is ${Component}!
Did you forget to import the component or is it possible there is a typo?`
    );
  }
  const { renderers } = result._metadata;
  const metadata = { displayName };
  const { hydration, isPage, props } = extractDirectives(displayName, _props);
  let html = "";
  let attrs = void 0;
  if (hydration) {
    metadata.hydrate = hydration.directive;
    metadata.hydrateArgs = hydration.value;
    metadata.componentExport = hydration.componentExport;
    metadata.componentUrl = hydration.componentUrl;
  }
  const probableRendererNames = guessRenderers(metadata.componentUrl);
  const validRenderers = renderers.filter((r) => r.name !== "astro:jsx");
  const { children, slotInstructions } = await renderSlots(result, slots);
  let renderer;
  if (metadata.hydrate !== "only") {
    let isTagged = false;
    try {
      isTagged = Component && Component[Renderer];
    } catch {
    }
    if (isTagged) {
      const rendererName = Component[Renderer];
      renderer = renderers.find(({ name }) => name === rendererName);
    }
    if (!renderer) {
      let error;
      for (const r of renderers) {
        try {
          if (await r.ssr.check.call({ result }, Component, props, children)) {
            renderer = r;
            break;
          }
        } catch (e) {
          error ?? (error = e);
        }
      }
      if (!renderer && error) {
        throw error;
      }
    }
    if (!renderer && typeof HTMLElement === "function" && componentIsHTMLElement(Component)) {
      const output = renderHTMLElement(result, Component, _props, slots);
      return output;
    }
  } else {
    if (metadata.hydrateArgs) {
      const passedName = metadata.hydrateArgs;
      const rendererName = rendererAliases.has(passedName) ? rendererAliases.get(passedName) : passedName;
      renderer = renderers.find(
        ({ name }) => name === `@astrojs/${rendererName}` || name === rendererName
      );
    }
    if (!renderer && validRenderers.length === 1) {
      renderer = validRenderers[0];
    }
    if (!renderer) {
      const extname = (_a = metadata.componentUrl) == null ? void 0 : _a.split(".").pop();
      renderer = renderers.filter(
        ({ name }) => name === `@astrojs/${extname}` || name === extname
      )[0];
    }
  }
  if (!renderer) {
    if (metadata.hydrate === "only") {
      throw new AstroError({
        ...AstroErrorData.NoClientOnlyHint,
        message: AstroErrorData.NoClientOnlyHint.message(metadata.displayName),
        hint: AstroErrorData.NoClientOnlyHint.hint(
          probableRendererNames.map((r) => r.replace("@astrojs/", "")).join("|")
        )
      });
    } else if (typeof Component !== "string") {
      const matchingRenderers = validRenderers.filter(
        (r) => probableRendererNames.includes(r.name)
      );
      const plural = validRenderers.length > 1;
      if (matchingRenderers.length === 0) {
        throw new AstroError({
          ...AstroErrorData.NoMatchingRenderer,
          message: AstroErrorData.NoMatchingRenderer.message(
            metadata.displayName,
            (_b = metadata == null ? void 0 : metadata.componentUrl) == null ? void 0 : _b.split(".").pop(),
            plural,
            validRenderers.length
          ),
          hint: AstroErrorData.NoMatchingRenderer.hint(
            formatList(probableRendererNames.map((r) => "`" + r + "`"))
          )
        });
      } else if (matchingRenderers.length === 1) {
        renderer = matchingRenderers[0];
        ({ html, attrs } = await renderer.ssr.renderToStaticMarkup.call(
          { result },
          Component,
          props,
          children,
          metadata
        ));
      } else {
        throw new Error(`Unable to render ${metadata.displayName}!

This component likely uses ${formatList(probableRendererNames)},
but Astro encountered an error during server-side rendering.

Please ensure that ${metadata.displayName}:
1. Does not unconditionally access browser-specific globals like \`window\` or \`document\`.
   If this is unavoidable, use the \`client:only\` hydration directive.
2. Does not conditionally return \`null\` or \`undefined\` when rendered on the server.

If you're still stuck, please open an issue on GitHub or join us at https://astro.build/chat.`);
      }
    }
  } else {
    if (metadata.hydrate === "only") {
      html = await renderSlot(result, slots == null ? void 0 : slots.fallback);
    } else {
      ({ html, attrs } = await renderer.ssr.renderToStaticMarkup.call(
        { result },
        Component,
        props,
        children,
        metadata
      ));
    }
  }
  if (renderer && !renderer.clientEntrypoint && renderer.name !== "@astrojs/lit" && metadata.hydrate) {
    throw new AstroError({
      ...AstroErrorData.NoClientEntrypoint,
      message: AstroErrorData.NoClientEntrypoint.message(
        displayName,
        metadata.hydrate,
        renderer.name
      )
    });
  }
  if (!html && typeof Component === "string") {
    const Tag = sanitizeElementName(Component);
    const childSlots = Object.values(children).join("");
    const iterable = renderAstroTemplateResult(
      await renderTemplate`<${Tag}${internalSpreadAttributes(props)}${markHTMLString(
        childSlots === "" && voidElementNames.test(Tag) ? `/>` : `>${childSlots}</${Tag}>`
      )}`
    );
    html = "";
    for await (const chunk of iterable) {
      html += chunk;
    }
  }
  if (!hydration) {
    return async function* () {
      if (slotInstructions) {
        yield* slotInstructions;
      }
      if (isPage || (renderer == null ? void 0 : renderer.name) === "astro:jsx") {
        yield html;
      } else {
        yield markHTMLString(html.replace(/\<\/?astro-slot\>/g, ""));
      }
    }();
  }
  const astroId = shorthash(
    `<!--${metadata.componentExport.value}:${metadata.componentUrl}-->
${html}
${serializeProps(
      props,
      metadata
    )}`
  );
  const island = await generateHydrateScript(
    { renderer, result, astroId, props, attrs },
    metadata
  );
  let unrenderedSlots = [];
  if (html) {
    if (Object.keys(children).length > 0) {
      for (const key of Object.keys(children)) {
        if (!html.includes(key === "default" ? `<astro-slot>` : `<astro-slot name="${key}">`)) {
          unrenderedSlots.push(key);
        }
      }
    }
  } else {
    unrenderedSlots = Object.keys(children);
  }
  const template = unrenderedSlots.length > 0 ? unrenderedSlots.map(
    (key) => `<template data-astro-template${key !== "default" ? `="${key}"` : ""}>${children[key]}</template>`
  ).join("") : "";
  island.children = `${html ?? ""}${template}`;
  if (island.children) {
    island.props["await-children"] = "";
  }
  async function* renderAll() {
    if (slotInstructions) {
      yield* slotInstructions;
    }
    yield { type: "directive", hydration, result };
    yield markHTMLString(renderElement("astro-island", island, false));
  }
  return renderAll();
}
function sanitizeElementName(tag) {
  const unsafe = /[&<>'"\s]+/g;
  if (!unsafe.test(tag))
    return tag;
  return tag.trim().split(unsafe)[0].trim();
}
async function renderFragmentComponent(result, slots = {}) {
  const children = await renderSlot(result, slots == null ? void 0 : slots.default);
  if (children == null) {
    return children;
  }
  return markHTMLString(children);
}
async function renderHTMLComponent(result, Component, _props, slots = {}) {
  const { slotInstructions, children } = await renderSlots(result, slots);
  const html = Component.render({ slots: children });
  const hydrationHtml = slotInstructions ? slotInstructions.map((instr) => stringifyChunk(result, instr)).join("") : "";
  return markHTMLString(hydrationHtml + html);
}
function renderComponent(result, displayName, Component, props, slots = {}) {
  if (isPromise(Component)) {
    return Promise.resolve(Component).then((Unwrapped) => {
      return renderComponent(result, displayName, Unwrapped, props, slots);
    });
  }
  if (isFragmentComponent(Component)) {
    return renderFragmentComponent(result, slots);
  }
  if (isHTMLComponent(Component)) {
    return renderHTMLComponent(result, Component, props, slots);
  }
  if (isAstroComponentFactory(Component)) {
    return createAstroComponentInstance(result, displayName, Component, props, slots);
  }
  return renderFrameworkComponent(result, displayName, Component, props, slots);
}
function renderComponentToIterable(result, displayName, Component, props, slots = {}) {
  const renderResult = renderComponent(result, displayName, Component, props, slots);
  if (isAstroComponentInstance(renderResult)) {
    return renderResult.render();
  }
  return renderResult;
}

const uniqueElements = (item, index, all) => {
  const props = JSON.stringify(item.props);
  const children = item.children;
  return index === all.findIndex((i) => JSON.stringify(i.props) === props && i.children == children);
};
async function* renderExtraHead(result, base) {
  yield base;
  for (const part of result.extraHead) {
    yield* renderChild(part);
  }
}
function renderAllHeadContent(result) {
  const styles = Array.from(result.styles).filter(uniqueElements).map((style) => renderElement("style", style));
  result.styles.clear();
  const scripts = Array.from(result.scripts).filter(uniqueElements).map((script, i) => {
    return renderElement("script", script, false);
  });
  const links = Array.from(result.links).filter(uniqueElements).map((link) => renderElement("link", link, false));
  const baseHeadContent = markHTMLString(links.join("\n") + styles.join("\n") + scripts.join("\n"));
  if (result.extraHead.length > 0) {
    return renderExtraHead(result, baseHeadContent);
  } else {
    return baseHeadContent;
  }
}
function createRenderHead(result) {
  result._metadata.hasRenderedHead = true;
  return renderAllHeadContent.bind(null, result);
}
const renderHead = createRenderHead;
async function* maybeRenderHead(result) {
  if (result._metadata.hasRenderedHead) {
    return;
  }
  yield createRenderHead(result)();
}

typeof process === "object" && Object.prototype.toString.call(process) === "[object process]";

function spreadAttributes(values, _name, { class: scopedClassName } = {}) {
  let output = "";
  if (scopedClassName) {
    if (typeof values.class !== "undefined") {
      values.class += ` ${scopedClassName}`;
    } else if (typeof values["class:list"] !== "undefined") {
      values["class:list"] = [values["class:list"], scopedClassName];
    } else {
      values.class = scopedClassName;
    }
  }
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, true);
  }
  return markHTMLString(output);
}

const AstroJSX = "astro:jsx";
const Empty = Symbol("empty");
const toSlotName = (slotAttr) => slotAttr;
function isVNode(vnode) {
  return vnode && typeof vnode === "object" && vnode[AstroJSX];
}
function transformSlots(vnode) {
  if (typeof vnode.type === "string")
    return vnode;
  const slots = {};
  if (isVNode(vnode.props.children)) {
    const child = vnode.props.children;
    if (!isVNode(child))
      return;
    if (!("slot" in child.props))
      return;
    const name = toSlotName(child.props.slot);
    slots[name] = [child];
    slots[name]["$$slot"] = true;
    delete child.props.slot;
    delete vnode.props.children;
  }
  if (Array.isArray(vnode.props.children)) {
    vnode.props.children = vnode.props.children.map((child) => {
      if (!isVNode(child))
        return child;
      if (!("slot" in child.props))
        return child;
      const name = toSlotName(child.props.slot);
      if (Array.isArray(slots[name])) {
        slots[name].push(child);
      } else {
        slots[name] = [child];
        slots[name]["$$slot"] = true;
      }
      delete child.props.slot;
      return Empty;
    }).filter((v) => v !== Empty);
  }
  Object.assign(vnode.props, slots);
}
function markRawChildren(child) {
  if (typeof child === "string")
    return markHTMLString(child);
  if (Array.isArray(child))
    return child.map((c) => markRawChildren(c));
  return child;
}
function transformSetDirectives(vnode) {
  if (!("set:html" in vnode.props || "set:text" in vnode.props))
    return;
  if ("set:html" in vnode.props) {
    const children = markRawChildren(vnode.props["set:html"]);
    delete vnode.props["set:html"];
    Object.assign(vnode.props, { children });
    return;
  }
  if ("set:text" in vnode.props) {
    const children = vnode.props["set:text"];
    delete vnode.props["set:text"];
    Object.assign(vnode.props, { children });
    return;
  }
}
function createVNode(type, props) {
  const vnode = {
    [Renderer]: "astro:jsx",
    [AstroJSX]: true,
    type,
    props: props ?? {}
  };
  transformSetDirectives(vnode);
  transformSlots(vnode);
  return vnode;
}

const slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
async function check(Component, props, { default: children = null, ...slotted } = {}) {
  if (typeof Component !== "function")
    return false;
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  try {
    const result = await Component({ ...props, ...slots, children });
    return result[AstroJSX];
  } catch (e) {
  }
  return false;
}
async function renderToStaticMarkup(Component, props = {}, { default: children = null, ...slotted } = {}) {
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  const { result } = this;
  const html = await renderJSX(result, createVNode(Component, { ...props, ...slots, children }));
  return { html };
}
var server_default = {
  check,
  renderToStaticMarkup
};

const SITE_TITLE = "My personal website'";
const SITE_DESCRIPTION = "Welcome to my personal website and blog";
const TWITTER_HANDLE = "@yourtwitterhandle";
const BASE_URL = new URL("https://thomas.vanausloos.com/");
const SITE_URL = BASE_URL.origin;

const $$Astro$h = createAstro("/Users/thomas/Documents/Projects/PersonalWebsite/src/components/Intro.astro", "https://thomas.vanausloos.com/", "file:///Users/thomas/Documents/Projects/PersonalWebsite/");
const $$Intro = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$Intro;
  return renderTemplate`${maybeRenderHead($$result)}<section class="mb-8">
  <div class="mb-6">
    <h1 class="font-bold text-text-heading text-center text-4xl md:text-5xl pt-4 pb-2 overflow-hidden">
      <span class="
            bg-gradient-to-bl bg-no-repeat bg-bottom bg-[length:90%_40%]
            from-primary-blue to-primary-blue dark:from-primary-blue dark:to-primary-blue
        ">
        Thomas Vanausloos
      </span>
    </h1>
    <p class="text-base pb-4 text-center">Web Developer. Angular enthousiast. Husband & father.</p>
  </div>
  <div>
    <p class="mb-5">
      Hello! Welcome to my personal website! Here you can find:
      </p><ul>
        <li>More information about who I am, what I do and how we can work together.</li>
        <li>My personal <a${addAttribute(`${SITE_URL}/blog`, "href")}>blog</a> and notes. Ranging from technical topics to random insights I have had over the years.</li>
        <li>Information about my <a${addAttribute(`${SITE_URL}/education-and-skills`, "href")}>education, skills</a> and my<a${addAttribute(`${SITE_URL}/projects`, "href")}> professional carreer</a>.</li>
      </ul>
    
  </div>
</section>`;
}, "/Users/thomas/Documents/Projects/PersonalWebsite/src/components/Intro.astro");

function getPageMeta({
  title: pageTitle,
  description,
  baseUrl,
  ogImageAbsoluteUrl,
  ogImageAltText,
  ogImageWidth,
  ogImageHeight,
  siteOwnerTwitterHandle,
  contentAuthorTwitterHandle
}) {
  if (!pageTitle) {
    throw Error("title is required for page SEO");
  }
  if (ogImageAbsoluteUrl) {
    ogImageAltText = !ogImageAltText ? `Preview image for ${pageTitle}` : ogImageAltText;
  }
  const meta = { title: pageTitle, description };
  const og = {
    title: pageTitle,
    description,
    type: "website",
    url: baseUrl,
    image: ogImageAbsoluteUrl,
    imageAlt: ogImageAltText,
    imageWidth: ogImageWidth ? String(ogImageWidth) : void 0,
    imageHeight: ogImageHeight ? String(ogImageHeight) : void 0
  };
  const twitter = {
    title: pageTitle,
    description,
    card: "summary_large_image",
    site: siteOwnerTwitterHandle,
    creator: contentAuthorTwitterHandle || siteOwnerTwitterHandle,
    image: ogImageAbsoluteUrl,
    imageAlt: ogImageAltText
  };
  return {
    meta,
    og,
    twitter
  };
}

const $$Astro$g = createAstro("/Users/thomas/Documents/Projects/PersonalWebsite/src/components/PageMeta.astro", "https://thomas.vanausloos.com/", "file:///Users/thomas/Documents/Projects/PersonalWebsite/");
const $$PageMeta = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$PageMeta;
  const { title, description } = Astro2.props;
  const { meta, og, twitter } = getPageMeta({
    title: title || SITE_TITLE,
    description: description || SITE_DESCRIPTION,
    baseUrl: SITE_URL,
    ogImageAbsoluteUrl: `${SITE_URL}/images/thomas.png`,
    ogImageAltText: "Website of Thomas Vanausloos",
    ogImageWidth: 1200,
    ogImageHeight: 630,
    siteOwnerTwitterHandle: TWITTER_HANDLE,
    contentAuthorTwitterHandle: TWITTER_HANDLE
  });
  return renderTemplate`<!-- Primary Meta Tags --><title>${meta.title}</title>
<meta name="title"${addAttribute(meta.title, "content")}>
${meta.description && renderTemplate`<meta name="description"${addAttribute(meta.description, "content")}>`}

<!-- Open Graph / Facebook -->
${og.title && renderTemplate`<meta property="og:title"${addAttribute(og.title, "content")}>`}
${og.description && renderTemplate`<meta property="og:description"${addAttribute(og.description, "content")}>`}
${og.type && renderTemplate`<meta property="og:type"${addAttribute(og.type, "content")}>`}
${og.url && renderTemplate`<meta property="og:url"${addAttribute(og.url, "content")}>`}
${og.image && renderTemplate`<meta property="og:image"${addAttribute(og.image, "content")}>`}
${og.imageAlt && renderTemplate`<meta property="og:image:alt"${addAttribute(og.imageAlt, "content")}>`}
${og.imageWidth && renderTemplate`<meta property="og:image:width"${addAttribute(og.imageWidth, "content")}>`}
${og.imageHeight && renderTemplate`<meta property="og:image:height"${addAttribute(og.imageHeight, "content")}>`}

<!-- Twitter -->
${twitter.title && renderTemplate`<meta property="twitter:title"${addAttribute(twitter.title, "content")}>`}
${twitter.description && renderTemplate`<meta property="twitter:description"${addAttribute(twitter.description, "content")}>`}
${twitter.site && renderTemplate`<meta property="twitter:site"${addAttribute(twitter.site, "content")}>`}
${twitter.creator && renderTemplate`<meta property="twitter:creator"${addAttribute(twitter.creator, "content")}>`}
<meta property="twitter:card" content="summary_large_image">
${twitter.image && renderTemplate`<meta property="twitter:image"${addAttribute(twitter.image, "content")}>`}
${twitter.imageAlt && renderTemplate`<meta property="twitter:image:alt"${addAttribute(twitter.imageAlt, "content")}>`}
<!-- {twitter.url && <meta property="twitter:url" content={twitter.url} />} -->
`;
}, "/Users/thomas/Documents/Projects/PersonalWebsite/src/components/PageMeta.astro");

const $$Astro$f = createAstro("/Users/thomas/Documents/Projects/PersonalWebsite/src/layouts/GoogleFont.astro", "https://thomas.vanausloos.com/", "file:///Users/thomas/Documents/Projects/PersonalWebsite/");
const $$GoogleFont = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$GoogleFont;
  return renderTemplate`<!-- 
    We don't want to use <link /> to load fonts from Google CDN 
    but if you want to switch font this is the easiest way 
    to check how your page will look with the new font.
--><!-- 
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;0,700;0,800;1,400;1,700&display=block"
        rel="stylesheet"
    />
    <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;0,800;1,400&display=swap"
        rel="stylesheet"
    />
-->${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => renderTemplate`<link rel="preload" href="/fonts/space-grotesk-v13-latin-regular.woff2" as="font" type="font/woff2" crossorigin="crossorigin"><link rel="preload" href="/fonts/space-grotesk-v13-latin-700.woff2" as="font" type="font/woff2" crossorigin="crossorigin"><style>
    /* space-grotesk-regular - latin */
    @font-face {
      font-family: "Space Grotesk";
      font-style: normal;
      font-weight: 400;
      src: local(""),
        url("/fonts/space-grotesk-v13-latin-regular.woff2") format("woff2"),
        /* Chrome 26+, Opera 23+, Firefox 39+ */
          url("/fonts/space-grotesk-v13-latin-regular.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
    }
    /* space-grotesk-700 - latin */
    @font-face {
      font-family: "Space Grotesk";
      font-style: normal;
      font-weight: 700;
      src: local(""),
        url("/fonts/space-grotesk-v13-latin-700.woff2") format("woff2"),
        /* Chrome 26+, Opera 23+, Firefox 39+ */
          url("/fonts/space-grotesk-v13-latin-700.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
    }
  </style>` })}
`;
}, "/Users/thomas/Documents/Projects/PersonalWebsite/src/layouts/GoogleFont.astro");

const $$Astro$e = createAstro("/Users/thomas/Documents/Projects/PersonalWebsite/src/layouts/FontAwesome.astro", "https://thomas.vanausloos.com/", "file:///Users/thomas/Documents/Projects/PersonalWebsite/");
const $$FontAwesome = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$FontAwesome;
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => renderTemplate`<link href="/fontawesome/css/fontawesome.bareminimum.css" rel="stylesheet"><link href="/fontawesome/css/brands.bareminimum.css" rel="stylesheet"><link href="/fontawesome/css/solid.min.css" rel="stylesheet">` })}
`;
}, "/Users/thomas/Documents/Projects/PersonalWebsite/src/layouts/FontAwesome.astro");

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$d = createAstro("/Users/thomas/Documents/Projects/PersonalWebsite/src/layouts/ThemeScript.astro", "https://thomas.vanausloos.com/", "file:///Users/thomas/Documents/Projects/PersonalWebsite/");
const $$ThemeScript = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$ThemeScript;
  return renderTemplate(_a || (_a = __template([`<script>
  // figure out user's preferred theme and set it as html class for tailwind before paint
  (function () {
    if (typeof window !== "undefined") {
      const isSystemColorSchemeDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const storageTheme = sessionStorage.getItem("theme");
      if (!storageTheme && isSystemColorSchemeDark) {
        document.documentElement.classList.add("dark");
        document.head.children.namedItem("theme-color").content = "#0f172a";
      } else if (storageTheme === "dark") {
        document.documentElement.classList.add("dark");
        document.head.children.namedItem("theme-color").content = "#0f172a";
      } else {
        // we already server render light theme
        document.head.children.namedItem("theme-color").content = "#ffffff";
      }
    }
  })();
<\/script>
`])));
}, "/Users/thomas/Documents/Projects/PersonalWebsite/src/layouts/ThemeScript.astro");

const $$Astro$c = createAstro("/Users/thomas/Documents/Projects/PersonalWebsite/src/layouts/Favicon.astro", "https://thomas.vanausloos.com/", "file:///Users/thomas/Documents/Projects/PersonalWebsite/");
const $$Favicon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$Favicon;
  return renderTemplate`<meta name="theme-color" content="#ffffff">
<!-- 
  This is an example. 
  Use https://realfavicongenerator.net to generate the icons and manifest. 
-->
<link href="/favicon.ico" rel="shortcut icon">
`;
}, "/Users/thomas/Documents/Projects/PersonalWebsite/src/layouts/Favicon.astro");

const $$Astro$b = createAstro("/Users/thomas/Documents/Projects/PersonalWebsite/src/components/HeaderLink.astro", "https://thomas.vanausloos.com/", "file:///Users/thomas/Documents/Projects/PersonalWebsite/");
const $$HeaderLink = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$HeaderLink;
  const { href, class: className, ...props } = Astro2.props;
  const path = Astro2.url.pathname.replace(/\/$/, "");
  const isHome = href === "/" && path === "";
  const isOtherPages = typeof href === "string" && href.length > 1 ? path.substring(1).startsWith(href.substring(1)) : false;
  const isActive = isHome || isOtherPages;
  return renderTemplate`<!-- DO NOT FORMAT. IT ADDS AN EXTRA SPACE ON RENDERED CONTENT. -->${maybeRenderHead($$result)}<a${addAttribute(href, "href")}${addAttribute([
    className,
    { "show": isActive },
    "unset animated-link"
  ], "class:list")}${spreadAttributes(props)}>${renderSlot($$result, $$slots["default"])}</a>`;
}, "/Users/thomas/Documents/Projects/PersonalWebsite/src/components/HeaderLink.astro");

const $$Astro$a = createAstro("/Users/thomas/Documents/Projects/PersonalWebsite/src/components/Nav.astro", "https://thomas.vanausloos.com/", "file:///Users/thomas/Documents/Projects/PersonalWebsite/");
const $$Nav = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Nav;
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": () => renderTemplate`${maybeRenderHead($$result)}<nav class="hidden md:inline astro-SQR6GYAH">
    <section class="text-text-bold astro-SQR6GYAH">
      <ul class="unset flex gap-4 [&>li]:p-0 astro-SQR6GYAH">
        <li class="astro-SQR6GYAH">${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/", "class": "astro-SQR6GYAH" }, { "default": () => renderTemplate`Thomas Vanausloos` })}</li>
        <li class="astro-SQR6GYAH">${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/education-and-skills", "class": "astro-SQR6GYAH" }, { "default": () => renderTemplate`Education and skills` })}</li>
        <li class="astro-SQR6GYAH">${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/projects", "class": "astro-SQR6GYAH" }, { "default": () => renderTemplate`Projects` })}</li>
        <li class="astro-SQR6GYAH">${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/blog", "class": "astro-SQR6GYAH" }, { "default": () => renderTemplate`Blog` })}</li>
      </ul>
    </section>
  </nav><nav class="md:hidden astro-SQR6GYAH">
    <button id="mobile-menu-open" class="astro-SQR6GYAH">
      <i class="fa-solid fa-bars astro-SQR6GYAH" aria-hidden="true" title="Open mobile menu"></i>
      <span class="fa-sr-only astro-SQR6GYAH">Open mobile menu</span>
    </button>
    <section id="mobile-menu" class="hide-menu fixed top-0 left-0 z-10 w-full h-full transition-transform bg-black/75 border-primary-blue astro-SQR6GYAH">
      <div class="bg-bg-body w-[75%] h-full drop-shadow-2xl astro-SQR6GYAH">
        <button id="mobile-menu-close" class="px-6 h-[5rem] text-lg xml-[1px] astro-SQR6GYAH">
          <i class="fa-solid fa-xmark astro-SQR6GYAH" aria-hidden="true" title="Close mobile menu"></i>
          <span class="fa-sr-only astro-SQR6GYAH">Close mobile menu</span>
        </button>
        <ul class="unset flex flex-col text-text-bold gap-4 [&>li]:p-0 px-6 astro-SQR6GYAH">
          <li class="astro-SQR6GYAH">${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/", "class": "astro-SQR6GYAH" }, { "default": () => renderTemplate`Thomas Vanausloos` })}</li>
          <li class="astro-SQR6GYAH">${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/education-and-skills", "class": "astro-SQR6GYAH" }, { "default": () => renderTemplate`Education and skills` })}</li>
          <li class="astro-SQR6GYAH">${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/projects", "class": "astro-SQR6GYAH" }, { "default": () => renderTemplate`Projects` })}</li>
          <li class="astro-SQR6GYAH">${renderComponent($$result, "HeaderLink", $$HeaderLink, { "href": "/blog", "class": "astro-SQR6GYAH" }, { "default": () => renderTemplate`Blog` })}</li>
        </ul>
      </div>
    </section>
  </nav>` })}

${maybeRenderHead($$result)}


`;
}, "/Users/thomas/Documents/Projects/PersonalWebsite/src/components/Nav.astro");

const $$Astro$9 = createAstro("/Users/thomas/Documents/Projects/PersonalWebsite/src/components/DarkModeToggle.astro", "https://thomas.vanausloos.com/", "file:///Users/thomas/Documents/Projects/PersonalWebsite/");
const $$DarkModeToggle = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$DarkModeToggle;
  return renderTemplate`${renderComponent($$result, "mode-toggle", "mode-toggle", { "class": "flex astro-6NZUI7XU" }, { "default": () => renderTemplate`
  ${maybeRenderHead($$result)}<button class="justify-self-end bg-black dark:bg-white ml-4 inline-flex h-6 w-11 items-center rounded-full astro-6NZUI7XU" id="mode-toggle" role="switch" type="button" tabindex="0" aria-checked="false" data-headlessui-state=""><span class="sr-only astro-6NZUI7XU">Toggle dark mode</span><span id="mode-circle" class="light inline-block h-4 w-4 rounded-full bg-gradient-to-tr invisible astro-6NZUI7XU"><span class="absolute top-0 right-0 w-[10px] h-[10px] rounded-full bg-gray-700 scale-[0] astro-6NZUI7XU"></span>
    </span>
  </button>
` })}

${maybeRenderHead($$result)}

`;
}, "/Users/thomas/Documents/Projects/PersonalWebsite/src/components/DarkModeToggle.astro");

const $$Astro$8 = createAstro("/Users/thomas/Documents/Projects/PersonalWebsite/src/components/Header.astro", "https://thomas.vanausloos.com/", "file:///Users/thomas/Documents/Projects/PersonalWebsite/");
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Header;
  return renderTemplate`${maybeRenderHead($$result)}<header class=" astro-WOQZYYQJ">
  <a class="unset absolute z-10 left-[50%] -top-[100rem] translate-x-[-50%] bg-white text-black px-8 py-2 focus:top-[initial] astro-WOQZYYQJ" href="#main">
    Skip to content
  </a>
  ${renderComponent($$result, "Nav", $$Nav, { "class": "astro-WOQZYYQJ" })}
  <div class="justify-self-end py-2 flex items-center content-center text-text-bold astro-WOQZYYQJ">
    <a class="unset ml-4 rounded-sm transition-[background-size] duration-150 ease-in-out bg-left-bottom bg-[length:0%_55%] hover:bg-[length:100%_55%] bg-no-repeat bg-gradient-to-r from-primary-yellow to-primary-yellow dark:bg-none dark:hover:text-primary-yellow astro-WOQZYYQJ" href="https://github.com/Thomasvanausloos/">
      <i class="fa-brands fa-github astro-WOQZYYQJ" aria-hidden="true" title="Thomas Vanausloos on GitHub"></i>
      <span class="astro-WOQZYYQJ">GitHub</span>
    </a>
    <a class="unset ml-4 rounded-sm transition-[background-size] duration-150 bg-left-bottom bg-[length:0%_55%] hover:bg-[length:100%_55%] bg-no-repeat bg-gradient-to-r from-primary-blue to-primary-blue dark:bg-none dark:hover:text-primary-blue astro-WOQZYYQJ" href="https://www.linkedin.com/in/thomasvanausloos/">
      <i class="fab fa-linkedin linkedin-icon astro-WOQZYYQJ" title="Thomas Vanausloos on Twitter"></i>
      <span class="astro-WOQZYYQJ">Linkedin</span>
    </a>
  </div>
  ${renderComponent($$result, "DarkModeToggle", $$DarkModeToggle, { "class": "astro-WOQZYYQJ" })}
</header>
`;
}, "/Users/thomas/Documents/Projects/PersonalWebsite/src/components/Header.astro");

const $$Astro$7 = createAstro("/Users/thomas/Documents/Projects/PersonalWebsite/src/components/Footer.astro", "https://thomas.vanausloos.com/", "file:///Users/thomas/Documents/Projects/PersonalWebsite/");
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead($$result)}<footer class="text-xs leading-[1.75] mt-4 astro-42B47LZM">
  <div class="astro-42B47LZM">
    This website is built by  
    <a class="unset gradient-link tracking-wider font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#f57111] to-[#f79605] hover:after:bg-gradient-to-r hover:after:from-[#f57111] hover:after:to-[#f79605] astro-42B47LZM"${addAttribute(`${SITE_URL}`, "href")} target="_blank">
      Thomas Vanausloos</a> and hosted on
    <a class="unset gradient-link tracking-wider font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00abda] to-[#1476ff] hover:after:bg-gradient-to-r hover:after:from-[#00abda] hover:after:to-[#1476ff] astro-42B47LZM"${addAttribute("https://github.com/Thomasvanausloos/Thomasvanausloos.github.io", "href")} target="_blank">
      GitHub</a> pages.
  </div>
</footer>

`;
}, "/Users/thomas/Documents/Projects/PersonalWebsite/src/components/Footer.astro");

const $$Astro$6 = createAstro("/Users/thomas/Documents/Projects/PersonalWebsite/src/layouts/PageLayout.astro", "https://thomas.vanausloos.com/", "file:///Users/thomas/Documents/Projects/PersonalWebsite/");
const $$PageLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$PageLayout;
  return renderTemplate`<html class="theme-bubblegum astro-VSPRTZL7" lang="en">
  <head>
    <!-- Global Metadata -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <!-- <meta name="generator" content="Blogster" /> -->
    ${renderComponent($$result, "Favicon", $$Favicon, { "class": "astro-VSPRTZL7" })}
    ${renderSlot($$result, $$slots["meta"])}
    ${renderComponent($$result, "GoogleFont", $$GoogleFont, { "class": "astro-VSPRTZL7" })}
    ${renderComponent($$result, "ThemeScript", $$ThemeScript, { "class": "astro-VSPRTZL7" })}
    ${renderComponent($$result, "FontAwesome", $$FontAwesome, { "class": "astro-VSPRTZL7" })}
  ${renderHead($$result)}</head>

  <body class="max-w-3xl mx-auto min-h-screen px-6 sm:px-8 astro-VSPRTZL7">
    ${renderComponent($$result, "Header", $$Header, { "class": "astro-VSPRTZL7" })}
    <main id="main" class="astro-VSPRTZL7">
      ${renderSlot($$result, $$slots["main"])}
    </main>
    ${renderComponent($$result, "Footer", $$Footer, { "class": "astro-VSPRTZL7" })}
    
  </body>
</html>`;
}, "/Users/thomas/Documents/Projects/PersonalWebsite/src/layouts/PageLayout.astro");

const $$Astro$5 = createAstro("/Users/thomas/Documents/Projects/PersonalWebsite/src/pages/index.astro", "https://thomas.vanausloos.com/", "file:///Users/thomas/Documents/Projects/PersonalWebsite/");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, {}, { "main": () => renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "slot": "main" }, { "default": () => renderTemplate`${renderComponent($$result, "Intro", $$Intro, {})}` })}`, "meta": () => renderTemplate`${renderComponent($$result, "PageMeta", $$PageMeta, { "title": `${SITE_TITLE} | Thomas Vanausloos`, "slot": "meta" })}` })}`;
}, "/Users/thomas/Documents/Projects/PersonalWebsite/src/pages/index.astro");

const $$file$3 = "/Users/thomas/Documents/Projects/PersonalWebsite/src/pages/index.astro";
const $$url$3 = "";

const _page0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file$3,
  url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$4 = createAstro("/Users/thomas/Documents/Projects/PersonalWebsite/src/pages/education-and-skills.astro", "https://thomas.vanausloos.com/", "file:///Users/thomas/Documents/Projects/PersonalWebsite/");
const $$EducationAndSkills = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$EducationAndSkills;
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, {}, { "main": () => renderTemplate`${maybeRenderHead($$result)}<section>
    <span>This page is currently under construction</span>
  </section>`, "meta": () => renderTemplate`${renderComponent($$result, "PageMeta", $$PageMeta, { "title": `Projects | ${SITE_TITLE}`, "slot": "meta" })}` })}`;
}, "/Users/thomas/Documents/Projects/PersonalWebsite/src/pages/education-and-skills.astro");

const $$file$2 = "/Users/thomas/Documents/Projects/PersonalWebsite/src/pages/education-and-skills.astro";
const $$url$2 = "/education-and-skills";

const _page1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$EducationAndSkills,
  file: $$file$2,
  url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const { nodes, Tag } = Markdoc;
const config = {
  tags: {
    details: {
      render: "details",
      children: nodes.document.children
    },
    summary: {
      render: "summary",
      children: nodes.document.children
    },
    sup: {
      render: "sup",
      children: nodes.strong.children
    },
    sub: {
      render: "sub",
      children: nodes.strong.children
    },
    abbr: {
      render: "abbr",
      attributes: {
        title: { type: String }
      },
      children: nodes.strong.children
    },
    kbd: {
      render: "kbd",
      children: nodes.strong.children
    },
    mark: {
      render: "mark",
      children: nodes.strong.children
    },
    youtube: {
      render: "YouTubeEmbed",
      attributes: {
        url: { type: String, required: true },
        label: { type: String, required: true }
      },
      selfClosing: true
    },
    tweet: {
      render: "TweetEmbed",
      attributes: {
        url: { type: String, required: true }
      },
      selfClosing: true
    },
    codepen: {
      render: "CodePenEmbed",
      attributes: {
        url: { type: String, required: true },
        title: { type: String, required: true }
      },
      selfClosing: true
    },
    githubgist: {
      render: "GitHubGistEmbed",
      attributes: {
        id: { type: String, required: true }
      },
      selfClosing: true
    }
  },
  nodes: {
    heading: {
      render: "Heading",
      attributes: {
        level: { type: Number, required: true }
      },
      transform(node, config2) {
        const attributes = node.transformAttributes(config2);
        const children = node.transformChildren(config2);
        return new Tag(this.render, { ...attributes }, children);
      }
    },
    fence: {
      render: "CodeBlock",
      attributes: {
        content: { type: String, render: false, required: true },
        language: { type: String, default: "typescript" },
        process: { type: Boolean, render: false, default: false }
      },
      transform(node, config2) {
        const attributes = node.transformAttributes(config2);
        const children = node.transformChildren(config2);
        if (children.some((child) => typeof child !== "string")) {
          throw new Error(
            `unexpected non-string child of code block from ${node.location?.file ?? "(unknown file)"}:${node.location?.start.line ?? "(unknown line)"}`
          );
        }
        return new Tag(
          this.render,
          { ...attributes, content: children.join("") },
          []
        );
      }
    }
  }
};

const contentDirectory = path.normalize("./content");
async function parseAndTransform({ content }) {
  const ast = Markdoc.parse(content);
  const errors = Markdoc.validate(ast, config);
  if (errors.length) {
    console.error(errors);
    throw new Error("Markdoc validation error");
  }
  const transformedContent = Markdoc.transform(ast, config);
  return transformedContent;
}
function validateFrontmatter({
  frontmatter,
  schema,
  filepath
}) {
  try {
    const validatedFrontmatter = schema.parse(frontmatter);
    return validatedFrontmatter;
  } catch (e) {
    const errMessage = `
      There was an error validating your frontmatter. 
      Please make sure your frontmatter for file: ${filepath} matches its schema.
    `;
    throw Error(errMessage + e.message);
  }
}
async function read({
  filepath,
  schema
}) {
  const rawString = await fs.readFile(filepath, "utf8");
  const { content, data: frontmatter } = matter(rawString);
  const transformedContent = await parseAndTransform({ content });
  const validatedFrontmatter = validateFrontmatter({
    frontmatter,
    schema,
    filepath
  });
  const filename = filepath.split("/").pop();
  if (typeof filename !== "string") {
    throw new Error("Check what went wrong");
  }
  const fileNameWithoutExtension = filename.replace(/\.[^.]*$/, "");
  return {
    slug: fileNameWithoutExtension,
    content: transformedContent,
    frontmatter: validatedFrontmatter
  };
}
async function readAll({
  directory,
  frontmatterSchema: schema
}) {
  const pathToDir = path.posix.join(contentDirectory, directory);
  const paths = await globby(`${pathToDir}/*.md`);
  return Promise.all(paths.map((path2) => read({ filepath: path2, schema })));
}

const baseSchema = z.object({
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  title: z.string({
    required_error: "Required frontmatter missing: title",
    invalid_type_error: "title must be a string"
  }),
  date: z.date({
    required_error: "Required frontmatter missing: date",
    invalid_type_error: "date must be written in yyyy-mm-dd format without quotes: For example, Jan 22, 2000 should be written as 2000-01-22."
  })
});
const blog = z.discriminatedUnion("external", [
  baseSchema.extend({
    external: z.literal(false),
    description: z.optional(z.string()),
    ogImagePath: z.optional(z.string()),
    canonicalUrl: z.optional(z.string())
  }),
  baseSchema.extend({
    external: z.literal(true),
    url: z.string({
      required_error: "external is true but url is missing. url must be set for posts marked as external.",
      invalid_type_error: "external should be string."
    })
  })
]);
const project = baseSchema.extend({
  date_from: z.date({
    required_error: "Required frontmatter missing: date_from",
    invalid_type_error: "date must be written in yyyy-mm-dd format without quotes: For example, Jan 22, 2000 should be written as 2000-01-22."
  }),
  date_until: z.date({
    required_error: "Required frontmatter missing: date_until",
    invalid_type_error: "date must be written in yyyy-mm-dd format without quotes: For example, Jan 22, 2000 should be written as 2000-01-22."
  }),
  technologies: z.array(z.string()).nonempty(),
  company: z.string({ required_error: "Required frontmatter missing: company" }),
  company_logo: z.string({ required_error: "Required frontmatter missing: company_logo" }),
  company_url: z.string({ required_error: "Required frontmatter missing: company_url" }),
  description: z.string({ required_error: "Required frontmatter missing: description" })
});

const $$Astro$3 = createAstro("/Users/thomas/Documents/Projects/PersonalWebsite/src/components/Project.astro", "https://thomas.vanausloos.com/", "file:///Users/thomas/Documents/Projects/PersonalWebsite/");
const $$Project = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Project;
  const { project } = Astro2.props;
  const formattedDateFrom = new Date(
    project.frontmatter.date_from
  ).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  const formattedDateUntil = new Date(
    project.frontmatter.date_until
  ).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  return renderTemplate`${renderComponent($$result, "astro-project", "astro-project", { "class": "astro-S3QWOB6W" }, { "default": () => renderTemplate`
  ${maybeRenderHead($$result)}<div class="title astro-S3QWOB6W" data-project-title>
    <span class="unset transition-[background-size] duration-300 bg-gradient-to-r bg-left-bottom bg-no-repeat bg-[length:0%_55%] hover:bg-[length:100%_55%] dark:bg-[length:0%_2px] hover:dark:bg-[length:100%_2px] from-primary-blue to-primary-blue dark:from-primary-blue dark:to-primary-blue astro-S3QWOB6W">${project.frontmatter.title}</span>
  </div>
  <div class="text-text-muted text-xs italic pt-1 mb-3 astro-S3QWOB6W">
    <time${addAttribute(project.frontmatter.date_from.toISOString(), "datetime")} class="astro-S3QWOB6W">
      ${formattedDateFrom}
    </time>
    <span class="astro-S3QWOB6W"> -</span>
    <time${addAttribute(project.frontmatter.date_until.toISOString(), "datetime")} class="astro-S3QWOB6W">
      ${formattedDateUntil}
    </time>
  </div>
  <div class="hide-extra-info astro-S3QWOB6W" data-project-extra-info>
    <div class="mb-3 text-sm astro-S3QWOB6W">
      <span class="astro-S3QWOB6W">${project.frontmatter.description}</span>
    </div>
    <div class="text-sm astro-S3QWOB6W">
      <span class="underline astro-S3QWOB6W">Technologiën:</span>
      <p class="mt-1 astro-S3QWOB6W">${project.frontmatter.technologies.join(", ")}</p>
    </div>
    <br class="astro-S3QWOB6W">
  </div>
` })}

${maybeRenderHead($$result)}
`;
}, "/Users/thomas/Documents/Projects/PersonalWebsite/src/components/Project.astro");

const $$Astro$2 = createAstro("/Users/thomas/Documents/Projects/PersonalWebsite/src/components/Card.astro", "https://thomas.vanausloos.com/", "file:///Users/thomas/Documents/Projects/PersonalWebsite/");
const $$Card = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Card;
  return renderTemplate`${maybeRenderHead($$result)}<div class="card astro-UL5WBFK7">
  ${renderSlot($$result, $$slots["default"])}
</div>
${maybeRenderHead($$result)}
`;
}, "/Users/thomas/Documents/Projects/PersonalWebsite/src/components/Card.astro");

const $$Astro$1 = createAstro("/Users/thomas/Documents/Projects/PersonalWebsite/src/pages/projects.astro", "https://thomas.vanausloos.com/", "file:///Users/thomas/Documents/Projects/PersonalWebsite/");
const $$Projects = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Projects;
  const projects = await readAll({
    directory: "projects",
    frontmatterSchema: project
  });
  const sortedProjects = projects.filter((p) => p.frontmatter.draft !== true).sort(
    (a, b) => new Date(b.frontmatter.date_from).valueOf() - new Date(a.frontmatter.date_from).valueOf()
  );
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "class": "astro-73PRWO4D" }, { "main": () => renderTemplate`${maybeRenderHead($$result)}<section class="astro-73PRWO4D">
    ${sortedProjects.map((project2) => renderTemplate`<div class="timeline-marker astro-73PRWO4D"></div><div class="project-card astro-73PRWO4D">
          ${renderComponent($$result, "Card", $$Card, { "class": "astro-73PRWO4D" }, { "default": () => renderTemplate`${renderComponent($$result, "Project", $$Project, { "project": project2, "class": "astro-73PRWO4D" })}` })}
        </div>`)}
  </section>`, "meta": () => renderTemplate`${renderComponent($$result, "PageMeta", $$PageMeta, { "title": `Projects | ${SITE_TITLE}`, "slot": "meta", "class": "astro-73PRWO4D" })}` })}

`;
}, "/Users/thomas/Documents/Projects/PersonalWebsite/src/pages/projects.astro");

const $$file$1 = "/Users/thomas/Documents/Projects/PersonalWebsite/src/pages/projects.astro";
const $$url$1 = "/projects";

const _page2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Projects,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro("/Users/thomas/Documents/Projects/PersonalWebsite/src/pages/blog.astro", "https://thomas.vanausloos.com/", "file:///Users/thomas/Documents/Projects/PersonalWebsite/");
const $$Blog = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Blog;
  const posts = await readAll({
    directory: "blog",
    frontmatterSchema: blog
  });
  const sortedPosts = posts.filter((p) => p.frontmatter.draft !== true).sort(
    (a, b) => new Date(b.frontmatter.date).valueOf() - new Date(a.frontmatter.date).valueOf()
  );
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, {}, { "main": () => renderTemplate`${maybeRenderHead($$result)}<section>
    <ul>
      ${sortedPosts.map((post) => {
    const formattedDate = new Date(
      post.frontmatter.date
    ).toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
    return renderTemplate`<li class="grid grid-cols-[1fr] md:grid-cols-[1fr_auto] mb-3 md:gap-2 items-start">
              <div class="title">
                ${post.frontmatter.external ? renderTemplate`<a${addAttribute(post.frontmatter.url, "href")} target="_blank" class="unset
                        transition-[background-size] duration-300 
                        bg-gradient-to-r bg-left-bottom bg-no-repeat
                        bg-[length:0%_55%] hover:bg-[length:100%_55%] dark:bg-[length:0%_2px] hover:dark:bg-[length:100%_2px]
                        from-primary-blue to-primary-blue dark:from-primary-blue dark:to-primary-blue
                      ">
                    <span>${post.frontmatter.title}</span>
                    <span>
                      <i class="ml-1 mr-1 text-[12px] pb-2 fa-solid fa-up-right-from-square"></i>
                    </span>
                  </a>` : renderTemplate`<a${addAttribute(`/blog/${post.slug}`, "href")} class="unset
                        transition-[background-size] duration-300 
                        bg-gradient-to-r bg-left-bottom bg-no-repeat
                        bg-[length:0%_55%] hover:bg-[length:100%_55%] dark:bg-[length:0%_2px] hover:dark:bg-[length:100%_2px]
                        from-primary-blue to-primary-blue dark:from-primary-blue dark:to-primary-blue
                      ">
                    ${post.frontmatter.title}
                  </a>`}
              </div>
              <div class="text-text-muted text-sm italic pt-1">
                <time${addAttribute(post.frontmatter.date.toISOString(), "datetime")}>
                  ${formattedDate}
                </time>
              </div>
            </li>`;
  })}
    </ul>
  </section>`, "meta": () => renderTemplate`${renderComponent($$result, "PageMeta", $$PageMeta, { "title": `Blog | ${SITE_TITLE}`, "slot": "meta" })}` })}`;
}, "/Users/thomas/Documents/Projects/PersonalWebsite/src/pages/blog.astro");

const $$file = "/Users/thomas/Documents/Projects/PersonalWebsite/src/pages/blog.astro";
const $$url = "/blog";

const _page3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Blog,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const pageMap = new Map([["src/pages/index.astro", _page0],["src/pages/education-and-skills.astro", _page1],["src/pages/projects.astro", _page2],["src/pages/blog.astro", _page3],]);
const renderers = [Object.assign({"name":"astro:jsx","serverEntrypoint":"astro/jsx/server.js","jsxImportSource":"astro"}, { ssr: server_default }),];

export { pageMap, renderers };
