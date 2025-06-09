import { motion } from 'framer-motion';
import { Link, redirect } from 'react-router';
import { Button } from '~/common/components/ui/button';
import { Card } from '~/common/components/ui/card';
import { makeSSRClient } from '~/supa-client';
import type { Route } from './+types/logout';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request)
  await client.auth.signOut()
  return redirect("/", { headers })
}

const LogoutPage = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8"
      >
        <Card className="p-6 space-y-6">
          <div className="text-center space-y-4">

            <h1 className="text-2xl font-bold">로그아웃되었습니다</h1>
            <p className="text-muted-foreground">
              안전하게 로그아웃되었습니다. 다시 이용해 주시기 바랍니다.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Button asChild className="w-full">
              <Link to="/login">다시 로그인하기</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/">메인 페이지로 돌아가기</Link>
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default LogoutPage; 