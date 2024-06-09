import { Button } from '#/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '#/components/ui/card'
import { Label } from '#/components/ui/label'
import Otp from '#/containers/Fields/otp'
import Text from '#/containers/Fields/text'
import { LoginForm } from '#/modules/auth/forms'

// import { LoginForm } from '#/modules/auth/forms'

const Login = () => {
  return (
    <LoginForm>
      {() => (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Sign in to to your account🔒.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Text name="email" placeholder="ex: john@doe.com" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Code</Label>
                  <Otp name='password' maxLength={4} />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">Log In</Button>
          </CardFooter>
        </Card>
      )}
    </LoginForm>
  )
}

export default Login