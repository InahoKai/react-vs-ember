import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { textFor, stubService } from 'example-app/tests/helpers';

module('Integration | Component | footer', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    stubService('todos');
  });


  test('all todos link is active', async function(assert) {
    assert.expect(2);

    stubService('router', { currentRouteName: 'index' });
    this.set('testTodos', []);

    await render(hbs`<Footer @todos={{testTodos}} />`);

    const activeNav = find('a.selected');
    const text = textFor('a.selected');

    assert.ok(activeNav);
    assert.equal(text, 'All');
  });

  test('uncompleted todos link is active', async function(assert) {
    assert.expect(2);

    stubService('router', { currentRouteName: 'uncompleted' });
    this.set('testTodos', []);

    await render(hbs`<Footer @todos={{testTodos}} />`);

    const activeNav = find('a.selected');
    const text = textFor('a.selected');

    assert.ok(activeNav);
    assert.equal(text, 'Active');
  });

  test('completed todos link is active', async function(assert) {
    assert.expect(2);

    stubService('router', { currentRouteName: 'completed' });
    this.set('testTodos', []);

    await render(hbs`<Footer @todos={{testTodos}} />`);

    const activeNav = find('a.selected');
    const text = textFor('a.selected');

    assert.ok(activeNav);
    assert.equal(text, 'Completed');
  });

  test('clear todos button is shown', async function(assert) {
    assert.expect(1);

    stubService('router');
    this.set('testTodos', [{ id: 1 }]);

    await render(hbs`<Footer @todos={{testTodos}} />`);

    const button = find('[data-test-clear-button]');

    assert.ok(button);
  });

  test('clear todos button is hidden', async function(assert) {
    assert.expect(1);

    stubService('router');
    this.set('testTodos', []);

    await render(hbs`<Footer @todos={{testTodos}} />`);

    const button = find('[data-test-clear-button]');

    assert.notOk(button);
  });

  test('itemWord | is plural', async function(assert) {
    assert.expect(1);

    stubService('router');
    this.set('testTodos', [{ id: 1 }, { id: 2 }]);

    await render(hbs`<Footer @todos={{testTodos}} />`);

    const text = textFor('[data-test-todo-count-text]');

    assert.ok(text.includes('items left'));
  });

  test('itemWord | is singular', async function(assert) {
    assert.expect(1);

    stubService('router');
    this.set('testTodos', [{ id: 1 }]);

    await render(hbs`<Footer @todos={{testTodos}} />`);

    const text = textFor('[data-test-todo-count-text]');

    assert.ok(text.includes('item left'));
  });


});
