'use strict';

var view = {};

view.create = function create(data) {
  return {
    name: data,
    links: createLinks(data)
  };
};

function createLinks(data) {
  return {
    data: '/data/' + data
  };
}

module.exports = view;