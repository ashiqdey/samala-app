

// concate two array of objet with id
export function concatArrayId(oldArr, newArr, sort = false) {
  const tempArr = [...oldArr];

  newArr.forEach(e => {
    const index = tempArr.findIndex(f => f.id === e.id);
    if (index < 0) {
      tempArr.push(e);
    }
    else {
      tempArr[index] = e;
    }
  });

  // descending
  if (sort) {
    if (sort === -1) {
      return tempArr.sort((a, b) => b.id - a.id);
    }
    return tempArr.sort((a, b) => a.id - b.id);
  }

  return tempArr;
}
