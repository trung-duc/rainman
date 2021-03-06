/**
 * Copyright (c) 2017, Duc Nguyen
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of this software authors nor the names of its
 *       contributors may be used to endorse or promote products derived from
 *       this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL DUC NGUYEN BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 * NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * @flow
 */

import { mod, binarySearchArray, Queue } from '../../src/api/utils';

describe('testing `mod`...', () => {
  test('`mod` does not return correct value for 5 mod 10', () => {
    expect(mod(5, 10)).toBe(5);
  });

  test('`mod` does not return correct value for -2 mod 6', () => {
    expect(mod(-2, 6)).toBe(4);
  });

  test('`mod` does not return correct value for 3 mod -4', () => {
    expect(mod(3, -4)).toBe(-1);
  });

  test('`mod` does not return correct value for -12 mod -5', () => {
    expect(mod(-12, -5)).toBe(-2);
  });

  test('`mod` does not return correct value for 0 mod -2', () => {
    expect(mod(0, -2)).toBe(0);
  });
});

var testArray = [1, 2, 4, 7, 8, 100, 121];
describe('testing `binarySearchArray`...', () => {
  test('`binarySearchArray` returns incorrect value index', () => {
    expect(binarySearchArray(testArray, 7)).toBe(3);
  });

  test('`binarySearchArray` returns index of ghost value', () => {
    expect(binarySearchArray(testArray, 3)).toBe(-1);
  });

  test('`binarySearchArray` returns correct index for missing value', () => {
    expect(binarySearchArray(testArray, 0, true)).toBe(0);
    expect(binarySearchArray(testArray, 3, true)).toBe(2);
    expect(binarySearchArray(testArray, 127, true)).toBe(7);
  });
});

test('testing `Queue`...', () => {
  var queue = new Queue(5);
  expect(queue.isEmpty()).toBe(true);
  expect(queue.getLength()).toBe(5);
  queue.push(10);
  queue.push(15);
  queue.push(20);
  expect(queue.contains(10)).toBe(true);
  expect(queue.contains(12)).toBe(false);
  expect(queue.pop()).toBe(10);
  expect(queue.pop()).toBe(15);

  queue.push(25);
  queue.push(30);
  queue.push(35);
  queue.push(40);
  expect(queue.isFull()).toBe(true);
  expect(queue.peekOldest()).toBe(20);
  expect(queue.peekNewest()).toBe(40);

  queue.push(45);
  queue.push(50);
  expect(queue.isFull()).toBe(true);
  expect(queue.peekOldest()).toBe(30);
  expect(queue.asArray()).toEqual([35, 40, 45, 50, 30]);
  expect(queue.immutePush(55).peekOldest()).toBe(35);

  queue.pop();
  queue.pop();
  expect(queue.contains(35)).toBe(false);
  queue.pop();
  expect(queue.peekOldest()).toBe(45);
  queue.pop();
  queue.pop();
  expect(queue.isEmpty()).toBe(true);
});
