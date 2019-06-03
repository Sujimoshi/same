import { Dispatch, Action } from "redux";
import { remote } from "electron";
import { readdir } from "fs";

export enum OPEN_PROJECT {
  PROCESSING = "OPEN_PROJECT_PROCESSING",
  FINISHED = "OPEN_PROJECT_FINISHED",
  ERROR = "OPEN_PROJECT_ERROR"
}

export interface ProjectStore {
  data?: string[];
  loading: boolean;
  error?: Error;
}

export interface OpenProjectAction extends Action<OPEN_PROJECT> {
  payload?: Partial<ProjectStore>;
}

export const openProjectProcessing = (): OpenProjectAction => ({
  type: OPEN_PROJECT.PROCESSING
});

export const openProjectFinished = (data: string[]): OpenProjectAction => ({
  type: OPEN_PROJECT.FINISHED,
  payload: { data }
});

export const openProjectError = (error: Error): OpenProjectAction => ({
  type: OPEN_PROJECT.ERROR,
  payload: { error }
});

export const openProject = () => (dispatch: Dispatch<OpenProjectAction>) => {
  dispatch(openProjectProcessing());
  remote.dialog.showOpenDialog({ properties: ["openDirectory"] }, filePaths => {
    readdir(filePaths[0], (error, data) => {
      if (error) dispatch(openProjectError(error));
      dispatch(openProjectFinished(data));
    });
  });
};

export const initialState: ProjectStore = {
  loading: false,
  error: null,
  data: []
};

export const reducers: {
  [key: string]: (
    state: ProjectStore,
    action: OpenProjectAction
  ) => ProjectStore;
} = {
  [OPEN_PROJECT.PROCESSING]: state => {
    return {
      ...state,
      loading: true,
      error: null,
      data: []
    };
  },
  [OPEN_PROJECT.FINISHED]: (state, action) => {
    return {
      ...state,
      loading: false,
      error: null,
      data: action.payload.data
    };
  },
  [OPEN_PROJECT.ERROR]: (state, action) => {
    return {
      ...state,
      loading: false,
      data: [],
      error: action.payload.error
    };
  }
};

export default (state = initialState, action: any) => {
  return reducers[action.type] ? reducers[action.type](state, action) : state;
};
