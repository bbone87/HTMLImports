/**
 *
 *  Web Starter Kit
 *  Copyright 2014 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

(function () {
  'use strict';

  ////////////////////////////////////////////////////////////////////////
  //
  // Menu
  //
  ////////////////////////////////////////////////////////////////////////

  var navdrawerContainer = document.querySelector('.navdrawer-container'),
      appbarElement = document.querySelector('.app-bar'),
      menuBtn = document.querySelector('.menu'),
      main = document.querySelector('main');

  function closeMenu() {
    appbarElement.classList.remove('open');
    navdrawerContainer.classList.remove('open');
  }

  function toggleMenu() {
    appbarElement.classList.toggle('open');
    navdrawerContainer.classList.toggle('open');
  }

  main.addEventListener('ontouchstart', closeMenu);
  main.addEventListener('click', closeMenu);
  menuBtn.addEventListener('click', toggleMenu);
  navdrawerContainer.addEventListener('click', function (event) {
    if (event.target.nodeName === 'A' || event.target.nodeName === 'LI') {
      closeMenu();
    }
  });

  ////////////////////////////////////////////////////////////////////////
  //
  // Templating
  //
  ////////////////////////////////////////////////////////////////////////

  // Update underscore template method to use {{ }} syntax for interpolation
  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
  };

  // create string->DOM method
  String.prototype.toDOM = function() {
    var element = document.createElement('div'),
        fragment = document.createDocumentFragment();
    element.innerHTML=this;
    fragment.appendChild(element.firstChild);
    return fragment;
  };

  // grab todo item template from import
  var todoList = document.querySelector('#todo-list-1'),
      todoItemHTML = document.querySelector('#todo-item-template')
                                .import
                                .querySelector('template')
                                .content
                                .querySelector('.todo-item'),
      todoItemTemplate = _.template(todoItemHTML.outerHTML);

  function createTodoItem(itemData) {
    var newItem = todoItemTemplate(itemData).toDOM(),
        checkbox = newItem.querySelector('input');

    checkbox.checked = itemData.finished === true;
    todoList.appendChild(newItem);
  }

  var todoListProvider = {
    'item1': {
      'title': 'Item 1 Title',
      'description': 'Item 1 short description',
      'finished': false
    },
    'item2': {
      'title': 'Item 2 Title',
      'description': 'Item 2 short description',
      'finished': true
    },
    'item3': {
      'title': 'Item 3 Title',
      'description': 'Item 3 short description',
      'finished': true
    },
    'item4': {
      'title': 'Item 4 Title',
      'description': 'Item 4 short description',
      'finished': true
    },
    'item5': {
      'title': 'Item 5 Title',
      'description': 'Item 5 short description',
      'finished': true
    }
  };

  _.each(todoListProvider, createTodoItem);

})();
