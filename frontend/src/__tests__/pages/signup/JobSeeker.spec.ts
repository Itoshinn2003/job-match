import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
const createMock = vi.hoisted(() => vi.fn())
const pushMock = vi.hoisted(() => vi.fn())
vi.mock('@/api/JobSeeker', () => ({
  create: createMock,
}))
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}))

const formData = {
  email: 'foo@example.com',
  password: 'Password123',
}
import SignUpJobSeeker from '@/pages/signup/JobSeeker.vue'
const wrapper = mount(SignUpJobSeeker)

describe('SignUpJobSeeker.vue', () => {
  describe('onSubmitメソッド', () => {
    it('呼び出し直後はisSubmittingがtrueになり、完了後falseになる', async () => {
      createMock.mockResolvedValue({ data: { id: 1 } })
      const promise = wrapper.vm.onSubmit(formData)

      expect(wrapper.vm.isSubmitting).toBe(true)
      await promise
      expect(wrapper.vm.isSubmitting).toBe(false)
    })

    it('呼び出し直後ValidationErrorは初期化される', async () => {
      createMock.mockResolvedValue({ data: { id: 1 } })
      const promise = wrapper.vm.onSubmit(formData)

      expect(wrapper.vm.validationError).toBe('')
    })

    it('成功時にroute.pushを呼びだす', async () => {
      createMock.mockResolvedValue({ data: { id: 1 } })

      wrapper.vm.onSubmit(formData)
      expect(pushMock).toHaveBeenCalledWith({ name: 'EmailSent', query: { email: formData.email } })
    })

    it('失敗時にvalidationErrorにエラーを追加', async () => {
      createMock.mockRejectedValue({
        response: {
          data: {
            errors: {
              full_messages: ['メールアドレスがすでに存在します'],
            },
          },
        },
      })

      await wrapper.vm.onSubmit(formData)
      expect(wrapper.vm.validationError).toEqual(['メールアドレスがすでに存在します'])
    })
  })
})
