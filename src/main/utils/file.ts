export const handleCheckSameFile = (
  sourceFile: Uint8Array,
  currentFile: Uint8Array
): boolean => {
  if (sourceFile.byteLength !== currentFile.byteLength) {
    return false;
  }
  for (let i = 0; i < sourceFile.byteLength; i++) {
    if (sourceFile[i] !== currentFile[i]) {
      return false;
    }
  }
  return true;
};
