/* eslint-disable */
export function getTreeData(list) {
  function getFather() {
    var arr = [];
    list.forEach(function(item) {
      if (
        !list.some(function(value) {
          return item.parentId === value.orgId;
        })
      ) {
        arr.push(item);
      }
    });
    return arr;
  }
  function getChildren(item) {
    var brr = JSON.parse(JSON.stringify(item));
    list.forEach(function(value) {
      if (value.parentId === item.orgId) {
        if (!brr.children) brr.children = [];
        brr.children.push(getChildren(value));
      }
    });
    return brr;
  }
  return getFather().map(function(value) {
    return getChildren(value);
  });
}

export function getChoice(str, list) {
  let arr = [];
  if (str)
    list.forEach(item => {
      if (str.indexOf(item.orgId) !== -1) {
        arr.push(item);
      }
    });
  return arr;
}
