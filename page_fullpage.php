<?php
/**
 * Template Name: Full Page
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	
	<!-- Start loading -->
	<div id="ajax-loading-screen"> <div class="loading-icon"> <div class="material-icon"> <div class="spinner"> <div class="right-side"> <div class="bar"></div> </div> <div class="left-side"> <div class="bar"></div> </div> </div> <div class="spinner color-2"> <div class="right-side"> <div class="bar"></div> </div> <div class="left-side"> <div class="bar"></div> </div> </div> </div> </div> </div>
	<!-- End loading -->

	<div id="page" class="site">
		<div id="content" class="site-content">
			<div id="primary" class="content-area">
				<main id="main" class="site-main -hide-title" role="main">
					<div id="fullpage">
						<?php while ( have_posts() ) : the_post(); ?>

							<?php the_content(); ?>

						<?php endwhile; // End of the loop. ?>
					</div>
				</main><!-- #main -->
			</div><!-- #primary -->
		</div><!--site-content-->
	</div><!--#page-->

	<?php wp_footer(); ?>

</body>
</html>
