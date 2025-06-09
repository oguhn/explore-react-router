import type { Route } from './+types/post-action-pick';
import { Form, redirect, useActionData, useNavigation } from 'react-router';
import { Button } from '~/common/components/ui/button';
import { Input } from '~/common/components/ui/input';
import { Label } from '~/common/components/ui/label';
import { Card, CardContent } from '~/common/components/ui/card';
import { LoaderCircle } from 'lucide-react';
import { z } from 'zod';
import { browserClient, makeSSRClient } from '~/supa-client';

const formSchema = z.object({
  title: z.string({
    required_error: "제목을 입력해주세요",
    invalid_type_error: "제목을 입력해주세요",
  }).min(1, "제목을 입력해주세요"),

  description: z.string({
    required_error: "설명을 입력해주세요",
    invalid_type_error: "설명을 입력해주세요",
  }).min(1, "설명을 입력해주세요"),

  imageUrl: z.string({
    required_error: "이미지 URL을 입력해주세요",
    invalid_type_error: "이미지 URL을 입력해주세요",
  }).url("유효한 URL을 입력해주세요"),

  benefits: z.string({
    required_error: "혜택을 입력해주세요",
    invalid_type_error: "혜택을 입력해주세요",
  }).min(1, "혜택을 입력해주세요"),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(Object.fromEntries(formData));

  if (!success) {
    return {
      formErrors: error.flatten().fieldErrors,
      serverError: null,
    };
  }

  const { title, description, imageUrl, benefits } = data;
  // const client = browserClient;
  const serverClient = makeSSRClient(request);

  const { data: { session } } = await serverClient.client.auth.getSession();

  if (!session?.user) {
    return {
      formErrors: null,
      serverError: '로그인이 필요합니다',
    };
  }

  const benefitsArray = benefits
    .split('\n')
    .map(benefit => benefit.trim())
    .filter(benefit => benefit.length > 0);

  const { error: dbError } = await serverClient.client
    .from("action_pick")
    .insert({
      id: crypto.randomUUID(),
      title,
      image: imageUrl,
      description,
      benefits: benefitsArray,
      user_id: session.user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

  if (dbError) {
    return {
      formErrors: null,
      serverError: "액션 픽을 저장하는 중 오류가 발생했습니다: " + dbError.message,
    };
  }

  return redirect("/admin/action-pick");
};

export default function PostActionPick() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">액션 픽 추가하기</h1>
            <p className="text-muted-foreground">새로운 액션 픽을 추가해보세요</p>
          </div>

          {actionData?.serverError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {actionData.serverError}
            </div>
          )}

          <Form method="post" className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">제목</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="제목을 입력해주세요"
                  required
                />
                {actionData?.formErrors?.title && (
                  <p className="text-sm text-red-500">
                    {actionData.formErrors.title.join(", ")}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">설명</Label>
                <div className="relative">
                  <textarea
                    id="description"
                    name="description"
                    className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="설명을 입력해주세요"
                    required
                  />
                </div>
                {actionData?.formErrors?.description && (
                  <p className="text-sm text-red-500">
                    {actionData.formErrors.description.join(", ")}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">이미지 URL</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  required
                />
                {actionData?.formErrors?.imageUrl && (
                  <p className="text-sm text-red-500">
                    {actionData.formErrors.imageUrl.join(", ")}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="benefits">혜택 (줄바꿈으로 구분)</Label>
                <div className="relative">
                  <textarea
                    id="benefits"
                    name="benefits"
                    className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="각 혜택을 줄바꿈으로 구분해주세요&#10;예시:&#10;1. 첫 번째 혜택&#10;2. 두 번째 혜택"
                    required
                    rows={4}
                  />
                </div>
                {actionData?.formErrors?.benefits && (
                  <p className="text-sm text-red-500">
                    {actionData.formErrors.benefits.join(", ")}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => window.history.back()}
                disabled={isSubmitting}
              >
                취소
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                )}
                저장하기
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
