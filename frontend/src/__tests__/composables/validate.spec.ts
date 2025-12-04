import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { emailValidate, passwordValidate, nameValidate } from '@/composables/validate'

describe('emailValidate', () => {
  describe('~@~.~形式', () => {
    it('trueが返ってくる', () => {
      expect(emailValidate('user@example.com')).toBeTruthy()
    })
  })
  describe('@~.~形式', () => {
    it('falseが返ってくる', () => {
      expect(emailValidate('@example.com')).toBeFalsy()
    })
  })
  describe('~@形式', () => {
    it('falseが返ってくる', () => {
      expect(emailValidate('user@')).toBeFalsy()
    })
  })
  describe('~@~.形式', () => {
    it('falseが返ってくる', () => {
      expect(emailValidate('user@example.')).toBeFalsy()
    })
  })
  describe('~@.~形式', () => {
    it('falseが返ってくる', () => {
      expect(emailValidate('user@.com')).toBeFalsy()
    })
  })
  describe('~@~形式', () => {
    it('falseが返ってくる', () => {
      expect(emailValidate('user@examplecom')).toBeFalsy()
    })
  })
})

describe('passwordValidate', () => {
  it('7文字は false', () => {
    expect(passwordValidate('aaaaaaa')).toBeFalsy()
  })
  it('8文字は true', () => {
    expect(passwordValidate('aaaaaaaa')).toBeTruthy()
  })
  it('20文字は true', () => {
    expect(passwordValidate('aaaaaaaaaaaaaaaaaaaa')).toBeTruthy()
  })
  it('21文字は false', () => {
    expect(passwordValidate('aaaaaaaaaaaaaaaaaaaaa')).toBeFalsy()
  })
})
