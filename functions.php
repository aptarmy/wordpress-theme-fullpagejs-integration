<?php

/**
 * Enqueue scripts and styles.
 */
function seed_scripts() {
	// APT FullPageJS
	if(is_page_template('page_fullpage.php')){
		// script
		wp_enqueue_script('apt-script-lib-scrolloverflow', get_template_directory_uri() . '/libs/scrolloverflow.min.js', array('jquery'));
		wp_enqueue_script('apt-script-lib-fullpagejs', get_template_directory_uri() . '/libs/fullPageJS/jquery.fullPage.min.js', array('apt-script-lib-scrolloverflow', 'jquery'));
		wp_enqueue_script('apt-script-lib-transit', get_template_directory_uri() . '/libs/jquery.transit.js', array('jquery'));
		wp_enqueue_script('apt-script-fullpagejs', get_template_directory_uri() . '/js/fullpage.js', array('apt-script-lib-fullpagejs', 'apt-script-lib-scrolloverflow'));
		// style
		wp_enqueue_style('apt-style-lib-fullpagejs', get_template_directory_uri() . '/libs/fullPageJS/jquery.fullPage.min.css');
		wp_enqueue_style('apt-style-fullpagejs', get_template_directory_uri() . '/css/fullpage.css');
		wp_enqueue_style('apt-style-lib-animatecss', get_template_directory_uri() . '/libs/animate.css');
	}
}
add_action( 'wp_enqueue_scripts', 'seed_scripts' );