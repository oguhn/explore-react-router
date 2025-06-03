import { z } from 'zod';
import { motion } from 'framer-motion';
import { Form, Link, redirect } from 'react-router';
import { Button } from '~/common/components/ui/button';
import { Input } from '~/common/components/ui/input';
import { Label } from '~/common/components/ui/label';
import { Card, CardContent } from '~/common/components/ui/card';
import { cn } from '~/lib/utils';
import { LoaderCircle } from 'lucide-react';
import { useNavigation } from 'react-router';
import { makeSSRClient } from '~/supa-client';

const formSchema = z.object({
    name: z.string({
        required_error: "이름을 입력해주세요",
        invalid_type_error: "이름을 입력해주세요(문자와함께)",
    }).min(2, "이름은 2자 이상이어야 합니다"),
    email: z.string({
        required_error: "이메일을 입력해주세요",
        invalid_type_error: "이메일을 입력해주세요(문자와함께)",
    }).email("이메일 형식이 아닙니다"),
    password: z.string({
        required_error: "비밀번호를 입력해주세요",
    }).min(8, "비밀번호는 8자 이상이어야 합니다"),
    confirmPassword: z.string({
        required_error: "비밀번호를 다시 입력해주세요",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
});

export const action = async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const { success, data, error } = formSchema.safeParse(Object.fromEntries(formData));

    if (!success) {
        return {
            signUpError: null,
            formErrors: error.flatten().fieldErrors,
        };
    }

    const { name, email, password } = data;
    const { client, headers } = makeSSRClient(request);

    try {
        const { error: signUpError } = await client.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name,
                },
            },
        });

        if (signUpError) {
            return {
                formErrors: null,
                signUpError: "이미 사용 중인 이메일입니다",
            };
        }

        return redirect("/login", { headers });
    } catch (error) {
        console.error('회원가입 실패:', error);
        return {
            formErrors: null,
            signUpError: "회원가입 중 오류가 발생했습니다. 다시 시도해주세요.",
        };
    }
};

export default function SignUpPage({ actionData }: { actionData: { formErrors?: Record<string, string[]>; signUpError?: string; } }) {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[550px] space-y-8 p-8"
            >
                <Card className="p-6 space-y-6">
                    <div className="text-center space-y-4">
                        <h1 className="text-3xl font-bold">스텝픽에 오신 것을 환영합니다!</h1>
                        <p className="text-muted-foreground">
                            새로운 계정을 만들어보세요 🚀
                        </p>
                    </div>

                    <Form method="post" className="space-y-6">
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">이름</Label>
                                <Input
                                    name="name"
                                    id="name"
                                    type="text"
                                    placeholder="이름을 입력해주세요"
                                    required
                                    className="w-full"
                                />
                                {actionData?.formErrors?.name && (
                                    <p className="text-red-500">{actionData.formErrors.name.join(", ")}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">이메일</Label>
                                <Input
                                    name="email"
                                    id="email"
                                    type="email"
                                    placeholder="이메일을 입력해주세요"
                                    required
                                    className="w-full"
                                />
                                {actionData?.formErrors?.email && (
                                    <p className="text-red-500">{actionData.formErrors.email.join(", ")}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">비밀번호</Label>
                                <Input
                                    name="password"
                                    id="password"
                                    type="password"
                                    placeholder="비밀번호를 입력해주세요"
                                    required
                                    className="w-full"
                                />
                                {actionData?.formErrors?.password && (
                                    <p className="text-red-500">{actionData.formErrors.password.join(", ")}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                                <Input
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="비밀번호를 다시 입력해주세요"
                                    required
                                    className="w-full"
                                />
                                {actionData?.formErrors?.confirmPassword && (
                                    <p className="text-red-500">{actionData.formErrors.confirmPassword.join(", ")}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                        회원가입 중...
                                    </>
                                ) : (
                                    "회원가입하기"
                                )}
                            </Button>

                            {actionData?.signUpError && (
                                <p className="text-red-500">{actionData.signUpError}</p>
                            )}
                        </CardContent>
                    </Form>

                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                            이미 계정이 있으신가요?{' '}
                            <Link to="/login" className="text-primary font-medium hover:underline">
                                로그인하기
                            </Link>
                        </p>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}