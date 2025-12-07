import { AuthFormLayout, SignUpForm } from '@/features/auth';

export default function SignUpPage() {
  return (
    <AuthFormLayout
      title="Створити акаунт"
      subtitle="Зареєструйтесь, щоб почати"
      footer={{
        text: 'Вже маєте акаунт?',
        linkText: 'Увійти',
        linkHref: '/login',
      }}
    >
      <SignUpForm />
    </AuthFormLayout>
  );
}
