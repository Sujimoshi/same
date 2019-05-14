const initialState = {}

const reducers: any = {}

export default (state = initialState, action: any) => {
  return reducers[action.type] ? reducers[action.type](state, action) : state
}
