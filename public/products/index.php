<?php
require('../backend/controller.php');
require('../backend/env.php');
require('../backend/db.php');
$db = new DB();


$url = explode("/", $_SERVER['REQUEST_URI']);
$id = array_pop($url);
$id = preg_replace('~\D~', '', $id);

if(strlen($id) < 1 || strlen($id)>10){
  echo "Invalid ID";
  exit();
}


$product = $db->select("title,qty,sprice,image_id", "products", "id='{$id}' LIMIT 1",1);
if(!$product){
  throwError("Product not found");
}


$image = $db->select("url", "images", "id='{$product->image_id}' LIMIT 1",1);


if(!$image){
  $image = '';
}
else{
  $image = $image->url;
  
  if (strpos($image, 'http') === 0) {
        // do nothing
    }
    else{
        $image = "https://samalapharmacy.in/backend".$image;
    }
}


function escapedTitle($str){
  $str = preg_replace("/[^[:alnum:]]/u", '-', $str);
  return strtolower(preg_replace('/\-+/', '-', $str));
}

$escapedTitle = escapedTitle($product->title);
$description = $product->qty." ● Price ₹".$product->sprice;

header("Content-Type: text/html");
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no" />

  <meta property="og:description" content="<?= $description ?>">
  
  <meta property="og:site_name" content="Samala Pharmacy">
  <meta property="og:title" content="<?= $product->title ?>">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://samalapharmacy.in/products/<?= $escapedTitle ?>/<?= $product->id ?>">
  <meta property="og:updated_time" content="1668255165" />

  <meta property="og:image" content="<?= $image ?>">
  <meta property="og:image:width" content="512" />
  <meta property="og:image:height" content="512" />
  <meta property="og:image" content="<?= $image ?>">
  <meta property="og:image:width" content="192" />
  <meta property="og:image:height" content="192" />

  <meta name="description" content="<?= $description ?>">

  <!-- Favicon -->
  <link rel="icon" type="image/png" sizes="512x512" href={$image}>
  <link rel="icon" type="image/png" sizes="192x192" href="/assets/favicon/android-icon-192x192.png">
  <link rel="icon" type="image/png" sizes="144x144" href="/assets/favicon/android-icon-144x144.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png">
  <link href="/assets/favicon/favicon.ico" rel="shortcut icon">


  <title><?= $product->title ?></title>
</head>

<body>

  <script type="text/javascript">
    (function(){
          setTimeout(()=>{
            window.location = '/app/products/<?= $escapedTitle ?>/<?= $id ?>';
          },200);
        })();
  </script>
</body>

</html>
