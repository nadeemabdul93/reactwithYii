<?php

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Response;
use yii\filters\VerbFilter;
use app\models\LoginForm;
use app\models\ContactForm;
use app\models\RegistrationForm;
use yii\filters\Cors;
use app\models\User;
class SiteController extends Controller
{
    /**
     * {@inheritdoc}
     */
    public function beforeAction($action) 
    { 
        $this->enableCsrfValidation = false; 
        return parent::beforeAction($action); 
    }
    public function behaviors()
    {
        return [
            'corsFilter' => [
                'class' => \yii\filters\Cors::class,
                'cors' => [
                    'Origin' => ['*'], // List the origins you want to allow, or use '*' for all
                    'Access-Control-Request-Method' => ['POST', 'GET', 'OPTIONS'], // Allowed methods
                    'Access-Control-Allow-Credentials' => true, // Allow credentials like cookies
                    'Access-Control-Request-Headers' => ['*'],
                    'Access-Control-Allow-Headers' => ['*'], // Allowed headers
                ],
            ],
            'access' => [
                'class' => AccessControl::class,
                'only' => ['logout'],
                'rules' => [
                    [
                        'actions' => ['logout'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::class,
                'actions' => [
                    'logout' => ['post'],
                ],
            ],
            // 'csrf' => [
            //     'class' => \yii\filters\CsrfFilter::class,
            //     'except' => ['signedup'], // Exclude this action from CSRF validation
            // ],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }

    /**
     * Displays homepage.
     *
     * @return string
     */
    public function actionIndex()
    {
        return $this->render('index');
    }

    /**
     * Login action.
     *
     * @return Response|string
     */
    public function actionRegister()
    {        
        return $this->render('register');
        
    }
    public function actionSignedup()
    {
        // $this->view->disable();
        \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        $request = Yii::$app->request;
        $requestData = $request->getBodyParams();
        $requestNew = json_decode($request->getRawBody(), true);
        $model = new RegistrationForm();
        // $data = Yii::$app->request->post();
        $data = $requestNew;
 
        if ($model->load($data, '') && $model->validate()) {
            if ($user = $model->register()) {
                return [
                    'status' => 'success',
                    'msg' => 'User registered successfully',
                    'data' => [
                        'username' => $user->username,
                        'email' => $user->email,
                        'auth_key' => $user->auth_key,
                    ]
                ];
            }
        }

        return [
            'status' => "failed",
            'msg' => 'Registration failed',
            'errors' => $model->errors,
        ];
    }

    
    public function actionLogin()
    {
        return $this->render('login');        
    }


    public function actionSignin()
    {
        \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        $request = Yii::$app->request;
        $requestData = $request->getBodyParams();
        $data = json_decode($request->getRawBody(), true);
        
        $model = new LoginForm();
        if ($model->load($data, '') && $model->login()) {
            return [
                'status' => "success",
                'msg' => 'Login successful',
                'user' => [
                    'username' => Yii::$app->user->identity->username,
                ],
            ];
        }

        return [
            'status' => "failed",
            'msg' => 'Login failed',
            'errors' => $model->errors,
        ];
    }

    public function actionLogout()
    {
        Yii::$app->user->logout();  // Log the user out
        Yii::$app->session->destroy();  // Destroy all session data
        return json_encode([
            'status' => "success",
            'msg' => 'Logout successful',
        ]);
    }
    /**
     * Displays contact page.
     *
     * @return Response|string
     */
    public function actionContact(){
        $model = new ContactForm();
        if ($model->load(Yii::$app->request->post()) && $model->contact(Yii::$app->params['adminEmail'])) {
            Yii::$app->session->setFlash('contactFormSubmitted');

            return $this->refresh();
        }
        return $this->render('contact', [
            'model' => $model,
        ]);
    }

    /**
     * Displays about page.
     *
     * @return string
     */
    public function actionAbout()
    {
        return $this->render('about');
    }
}
