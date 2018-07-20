let idx = 0;
const uuid = (prefix = "id") => `${prefix}-${idx++}`;

export default uuid;
