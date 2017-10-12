export const UPDATE_OPTION = 'UPDATE_OPTION'

const defaultOptions = [{
  name: "Filter Size",
  id: "filterSize",
  min: 0,
  max: 100,
  step: 1,
  value: 15,
  type: 'range'
}, {
  name: "Sharpen",
  id: "sharpen",
  min: '0',
  max: '5',
  step: '.1',
  value: '1',
  type: 'range'
}, {
  name: "Offset",
  id: "offset",
  min: '0',
  max: '100`',
  step: '1',
  value: '5',
  type: 'range'
}, {
  name: "Threshold",
  id: "threshold",
  min: '0',
  max: '100`',
  step: '1',
  value: '50',
  type: 'range'
}, {
  name: "Pad Amount",
  id: "padamt",
  min: '0',
  max: '100`',
  step: '1',
  value: '50',
  type: 'range'
}, {
  name: "GreyScale",
  id: "grey",
  min: '0',
  max: '1`',
  step: '1',
  value: 'false',
  type: 'checkbox'
}];

export const magickOptions = (state = defaultOptions, { type, payload }) => {
  switch (type) {
    case '@ngrx/store/init':
      return state
    case UPDATE_OPTION:
      return state.map(e => ((e.id == payload.id) ? payload.value : e))

    default:
      return state
  }
}
