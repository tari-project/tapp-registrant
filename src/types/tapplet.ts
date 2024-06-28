// import {
//   object,
//   record,
//   string,
//   optional,
//   enums,
//   Infer,
//   pattern,
//   array,
// } from "superstruct";

// export const AssetsPathStruct = pattern(
//   string(),
//   /\.\/assets\/.*\/\d+\.(?:png|jpe?g)$/u
// );

// export const CategoryEnums = enums(["test", "defi", "gamefi", "meme"]);

// export const AuthorStruct = object({
//   name: string(),
//   website: string(),
// });
// export type Author = Infer<typeof AuthorStruct>;

// export const AboutStruct = object({
//   summary: string(),
//   description: string(),
// });
// export type About = Infer<typeof AboutStruct>;

// export const DesignStruct = object({
//   logoPath: AssetsPathStruct,
//   backgroundPath: AssetsPathStruct,
// });
// export type Design = Infer<typeof DesignStruct>;

// export const RepositoryStruct = object({
//   type: string(),
//   url: string(),
//   codeowners: array(string()),
// });
// export type Repository = Infer<typeof RepositoryStruct>;

// export const LocationStruct = object({
//   packageName: string(),
//   registry: string(),
// });
// export const SourceStruct = object({
//   location: record(enums(["npm"]), LocationStruct),
// });

// export const StatusEnums = enums(["WIP", "MVP", "PROD"]);

// export const TappManifestStruct = object({
//   packageName: string(),
//   displayName: string(),
//   version: string(),
//   status: optional(StatusEnums),
//   category: optional(CategoryEnums),
//   author: optional(AuthorStruct),
//   about: AboutStruct,
//   design: DesignStruct,
//   repository: RepositoryStruct,
//   source: SourceStruct,
//   manifestVersion: string(), //TODO use SemVerRange from @metamask/utils
// });
// export type TappManifest = Infer<typeof TappManifestStruct>;

type AssetsPath = string & {
  __superstructPattern: "/\\./assets/.*\\/\\d+\\.(?:png|jpe?g)$/u";
};

type Category = "test" | "defi" | "gamefi" | "meme";

type Author = {
  name: string;
  website: string;
};

type About = {
  summary: string;
  description: string;
};

type Design = {
  logoPath: AssetsPath;
  backgroundPath: AssetsPath;
};

type Repository = {
  type: string;
  url: string;
  codeowners: string[];
};

type Location = {
  packageName: string;
  registry: string;
};

type Source = {
  location: Record<"npm", Location>;
};

type Status = "WIP" | "MVP" | "PROD";

export type TappManifest = {
  packageName: string;
  displayName: string;
  version: string;
  status?: Status;
  category?: Category;
  author?: Author;
  about: About;
  design: Design;
  repository: Repository;
  source: Source;
  manifestVersion: string; // TODO: use SemVerRange from @metamask/utils
};
