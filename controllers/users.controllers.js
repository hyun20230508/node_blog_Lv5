const UserService = require('../services/users.service');

class UsersController {
  UserService = new UserService();

  //회원가입
  userSignUp = async (req, res, next) => {
    try {
      const { nickname, password, confirm } = req.body;
      const searchStr = /[^a-zA-Z0-9]/;

      if (
        nickname.length < 4 ||
        nickname.length > 16 ||
        nickname.search(searchStr) != -1
      ) {
        res.status(400).json({
          errorMessage:
            '닉네임에는 특수문자 사용이 불가능하며, 4글자 이상 16글자 이하로 작성되어야합니다.',
        });
        return;
      }
      if (password !== confirm) {
        res.status(400).json({
          errorMessage: '패스워드가 패스워드 확인란과 다릅니다.',
        });
        return;
      }
      if (password.length < 4) {
        res.status(400).json({
          errorMessage: '비밀번호는 4글자 이상으로 작성되어야합니다.',
        });
        return;
      }

      const userSignUpData = await this.UserService.userSignUp(
        nickname,
        password
      );

      res.status(201).json({ data: userSignUpData });
    } catch (error) {
      res.status(400).json({ errorMessage: '회원가입에 실패했습니다.' });
    }
  };

  //로그인
  userLogin = async (req, res, next) => {
    try {
      const { nickname, password } = req.body;
      const token = await this.UserService.userLogin(nickname, password);
      res.cookie('authorization', `Bearer ${token}`);
      res.status(201).json({ message: '로그인 성공' });
    } catch (error) {
      console.log(error);
      res.status(400).json({ errorMessage: '로그인에 실패했습니다.' });
    }
    return;
  };
}

module.exports = UsersController;
