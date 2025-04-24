# DevTinder APIs

## authRouter
-POST/signup
-POST/login
-POST/logout

## profileRouter
-GET/profile/view
-PATCH/profile/edit
-PATCH/profile/password

## connectionRequestRouter
-Post/request/send/interested/:userId
-Post/request/send/ignored/:userId
-Post/request/review/accepted/:requestId
-Post/request/review/rejected/:requestId

## userRouter
-GET/user/connections
-GET/user/requests
-GET/user/feed
