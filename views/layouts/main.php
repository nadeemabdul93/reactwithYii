<?php
use app\widgets\Alert;
use yii\helpers\Html;
use yii\bootstrap4\NavBar;
use yii\bootstrap4\Nav;
use yii\widgets\Breadcrumbs;
// use app\assets\AppAsset;

$this->registerCssFile('@web/frontend/index.css');
$this->registerJsFile('@web/frontend/index.js', ['position' => \yii\web\View::POS_END]);
?>

<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
</head>
<body>
<?php $this->beginBody() ?>

<?php if (!Yii::$app->user->isGuest): ?>
    <div id="header-container"></div> <!-- React header will be rendered here -->
<?php else: ?>
    <?php
    NavBar::begin([
        // 'brandLabel' => Yii::$app->name,
        // 'brandUrl' => Yii::$app->homeUrl,
        'options' => ['class' => 'navbar-expand-md navbar-dark bg-dark fixed-top']
    ]);
    echo Nav::widget([
        'options' => ['class' => 'navbar-nav'],
        'items' => [
            ['label' => 'Home', 'url' => ['/site']],
            ['label' => 'About', 'url' => ['/site/about']],
            ['label' => 'Contact', 'url' => ['/site/contact']],
            Yii::$app->user->isGuest
                ? ['label' => 'Login', 'url' => ['/site/login']]
                : ['label' => 'Logout (' . Yii::$app->user->identity->username . ')', 'url' => ['/site/logout'], 'linkOptions' => ['class' => 'nav-link btn btn-link logout', 'data-method' => 'post']],
            Yii::$app->user->isGuest
                ? ['label' => 'Register', 'url' => ['/site/register']]
                : null,
        ],
    ]);
    NavBar::end();
    ?>
<?php endif; ?>

<div class="wrap">
    <?php
    NavBar::begin([
        // 'brandLabel' => Yii::$app->name,
        // 'brandUrl' => Yii::$app->homeUrl,
        'options' => [
            'class' => 'navbar-inverse navbar-fixed-top',
        ],
    ]);
    echo Nav::widget([
        'options' => ['class' => 'navbar-nav navbar-right'],
        'items' => [
            ['label' => 'Home', 'url' => ['/site']],
            ['label' => 'Example 1', 'url' => ['/product/index']],
            ['label' => 'Example 2', 'url' => ['/site/react']],
           
        ],
    ]);
    NavBar::end();
    ?>

    <div class="container">
        <?= Breadcrumbs::widget([
            'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
        ]) ?>
        <?= Alert::widget() ?>
        <?= $content ?>
    </div>
</div>

<!-- <footer class="footer">
    <div class="container">
        <p class="pull-left">&copy; My Company <?= date('Y') ?></p>
        <p class="pull-right"><?= Yii::powered() ?></p>
    </div>
</footer> -->

<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
