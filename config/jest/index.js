module.exports = {
  rootDir: "../../",
  roots: ["<rootDir>/src"],
  setupFiles: ["<rootDir>/config/jest/setup.js"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"]
};
