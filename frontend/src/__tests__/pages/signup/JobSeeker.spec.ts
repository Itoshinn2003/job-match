import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
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
const startSpy = vi.fn()
const finishSpy = vi.fn()
const setErrorSpy = vi.fn()
vi.mock('@/composables/submitState', () => ({
  useSubmitState: () => ({
    isSubmitting: ref(false),
    validationError: ref(''),
    startSubmitting: startSpy,
    finishSubmitting: finishSpy,
    setValidationError: setErrorSpy,
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
    it('startSubmittingとfinishSubmittingが呼ばれること', async () => {
      createMock.mockResolvedValue({ data: { id: 1 } })
      const promise = wrapper.vm.onSubmit(formData)
      expect(startSpy).toHaveBeenCalledTimes(1)
      await promise
      expect(finishSpy).toHaveBeenCalledTimes(1)
    })

    it('成功時にroute.pushを呼びだす', async () => {
      createMock.mockResolvedValue({ data: { id: 1 } })

      wrapper.vm.onSubmit(formData)
      expect(pushMock).toHaveBeenCalledWith({ name: 'EmailSent', query: { email: formData.email } })
    })

    it('失敗時にsetValidationErrorが呼ばれること', async () => {
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
      // expect(wrapper.vm.validationError).toEqual(['メールアドレスがすでに存在します'])
      expect(setErrorSpy).toHaveBeenCalledTimes(1)
    })
  })
})
