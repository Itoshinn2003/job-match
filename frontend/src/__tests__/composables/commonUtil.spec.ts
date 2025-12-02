import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { calculateAge, getFullName } from '@/composables/commonUtil'

describe('calculateAge', () => {
  describe('生年月日を入力していない場合', () => {
    it('未入力と計算される', () => {
      expect(calculateAge(null)).toBe('未入力')
    })
  })

  describe('現在の日付が今年の誕生日を越していない場合', () => {
    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2024-01-01'))
    })

    it('23歳と計算される', () => {
      expect(calculateAge('2000-05-05')).toBe('23歳')
    })
  })

  describe('現在の日付が今年の誕生日を越した場合', () => {
    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2024-12-31'))
    })

    it('24歳と計算される', () => {
      expect(calculateAge('2000-05-05')).toBe('24歳')
    })
  })
})

describe('getFullName', () => {
  describe('名字と名前が未入力の場合', () => {
    it('未入力が返される', () => {
      expect(getFullName('', '')).toBe('未入力')
    })
  })

  describe('名字のみ未入力の場合', () => {
    it('名字が返される', () => {
      expect(getFullName('', '山田')).toBe('山田')
    })
  })

  describe('名前のみ未入力の場合', () => {
    it('名前が返される', () => {
      expect(getFullName('太郎', '')).toBe('太郎')
    })
  })
  describe('どちらも入力されている場合', () => {
    it('名字と名前が返される', () => {
      expect(getFullName('太郎', '山田')).toBe('山田太郎')
    })
  })
})
