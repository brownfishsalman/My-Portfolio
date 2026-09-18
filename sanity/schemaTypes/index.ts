import type { SchemaTypeDefinition } from "sanity";
import { experience } from "./experience";
import { project } from "./project";
import { publication } from "./publication";
import { siteSettings } from "./siteSettings";
import { skillGroup } from "./skillGroup";

export const schemaTypes: SchemaTypeDefinition[] = [siteSettings, project, publication, skillGroup, experience];
