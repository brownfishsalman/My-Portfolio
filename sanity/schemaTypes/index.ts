import type { SchemaTypeDefinition } from "sanity";
import { experience } from "./experience";
import { project } from "./project";
import { siteSettings } from "./siteSettings";
import { skillGroup } from "./skillGroup";

export const schemaTypes: SchemaTypeDefinition[] = [siteSettings, project, skillGroup, experience];
