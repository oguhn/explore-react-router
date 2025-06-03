import type { Route } from './+types/login-page';
import { motion } from 'framer-motion';
import { Form, Link, redirect, useNavigation } from 'react-router';
import { Button } from '~/common/components/ui/button';
import { Input } from '~/common/components/ui/input';
import { Label } from '~/common/components/ui/label';
import { Card, CardContent } from '~/common/components/ui/card';
import { LoaderCircle } from 'lucide-react';
import { z } from 'zod';
import { makeSSRClient } from '~/supa-client';

const formSchema = z.object({
    email: z.string({
        required_error: "이메일을 입력해주세요",
        invalid_type_error: "이메일을 입력해주세요(문자와함께)",
    }).email("이메일 형식이 아닙니다"),
    password: z.string({ required_error: "비밀번호를 입력해주세요" }).min(6, "비밀번호는 6자 이상이어야 합니다"),
})


export const action = async ({ request }: Route.LoaderArgs) => {
    const formData = await request.formData()
    console.log('formData', formData)
    const { success, data, error } = formSchema.safeParse(Object.fromEntries(formData))
    console.log('data', data)
    if (!success) {
        return {
            loginError: null,
            formErrors: error.flatten().fieldErrors,
        }
    }
    const { email, password } = data
    const { client, headers } = makeSSRClient(request)
    const { error: loginError } = await client.auth.signInWithPassword({
        email, password
    })
    if (loginError) {
        return {
            formErrors: null,
            loginError: "회원 정보를 찾을 수 없습니다",
        }
    }
    return redirect("/", { headers })
}

export default function LoginPage({ actionData }: Route.ComponentProps) {
    console.log('actionData', actionData)
    const navigation = useNavigation()
    const isSubmitting = navigation.state === "submitting"


    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[550px]  space-y-8 p-8"
            >
                <Card className="p-6 space-y-6">
                    <div className="text-center space-y-4">
                        <h1 className="text-3xl font-bold">스텝픽에 오신 것을 환영합니다.</h1>
                        <p className="text-muted-foreground">오늘의 첫걸음을 시작해보세요</p>
                    </div>

                    <Form className="space-y-6" method="post">
                        <CardContent className="space-y-4">
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
                                {actionData && "formErrors" in actionData && (
                                    <p className="text-red-500">{actionData.formErrors?.email?.join(", ")}</p>
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
                                {actionData && "formErrors" in actionData && (
                                    <p className="text-red-500">{actionData.formErrors?.password?.join(", ")}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : "로그인"}
                            </Button>
                            {actionData && "loginError" in actionData && (
                                <p className="text-red-500">{actionData.loginError}</p>
                            )}
                            <div className="relative my-4">
                                <div className="absolute left-0 top-1/2 w-full border-t border-muted" />
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-background px-2 text-muted-foreground">또는</span>
                                </div>
                            </div>

                            <div className="grid gap-4">
                                <Button
                                    variant="outline"
                                    className="w-full justify-center gap-2"
                                >
                                    Google로 로그인
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full justify-center gap-2"
                                >
                                    카카오로 로그인
                                </Button>
                            </div>
                        </CardContent>
                    </Form>

                    <div className="text-center space-y-4">
                        <Link
                            to="/forgot-password"
                            className="text-sm text-muted-foreground hover:text-primary"
                        >
                            비밀번호를 잊으셨나요?
                        </Link>
                        <Link
                            to="/signup"
                            className="text-sm text-primary font-medium"
                        >
                            아직 회원이 아니신가요? 회원가입하기
                        </Link>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
