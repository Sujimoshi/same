import { ComponentConfig } from "@same/configurator";
import { join, dirname } from "path";
import { promises } from "fs";
import { groupBy, Dictionary } from "underscore";
import { generateComponent } from "@same/configurator/generator";
import rimraf from "rimraf";
import { promisify } from "util";
const { writeFile, readFile, mkdir } = promises;
const rmdir = promisify(rimraf);

export const SRC_FOLDER = "src/styled";

export interface SameConfig {
  path: string;
  components: Dictionary<ComponentConfig>;
  focusedComponent: string;
  focusedNode: string;
}

export const createProjectConfig = (path: string = ""): SameConfig => ({
  path,
  focusedComponent: "",
  focusedNode: "",
  components: {}
});

export const loadProject = async (path: string): Promise<SameConfig> => {
  const datafile = join(path, "same.json");
  try {
    const data = await readFile(datafile);
    return JSON.parse(data.toString());
  } catch (e) {
    const projectConfig = createProjectConfig(path);
    await writeFile(datafile, JSON.stringify(projectConfig));
    return projectConfig;
  }
};

export const saveProject = async (project: SameConfig) => {
  await writeFile(
    join(project.path, "same.json"),
    JSON.stringify(project, null, 2)
  );
  await updateSources(project.path, project.components);
};

export const updateSources = async (
  path: string,
  components: Dictionary<ComponentConfig>
) => {
  await rmdir(join(path, SRC_FOLDER));
  const grouped = groupBy(Object.values(components), el => el.path);
  const promises = Object.entries(grouped).map(([componentPath, configs]) => {
    return writeFileRecursive(
      join(path, SRC_FOLDER, componentPath),
      generateComponent(configs, components)
    );
  });
  await Promise.all(promises);
};

export const writeFileRecursive = async (path: string, data: string) => {
  try {
    await writeFile(path, data);
  } catch (error) {
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, data);
  }
};
