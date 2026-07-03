<?php
/**
 * Funções e definições do tema Starter Theme.
 *
 * @package StarterTheme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'STARTER_THEME_VERSION', '1.0.0' );
define( 'STARTER_THEME_DIR', get_template_directory() );
define( 'STARTER_THEME_URI', get_template_directory_uri() );

/**
 * Configuração inicial do tema.
 *
 * @return void
 */
function starter_theme_setup(): void {
	load_theme_textdomain( 'starter-theme', STARTER_THEME_DIR . '/languages' );

	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
	add_theme_support( 'custom-logo', array(
		'height'      => 100,
		'width'       => 400,
		'flex-height' => true,
		'flex-width'  => true,
	) );

	add_theme_support( 'align-wide' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'editor-styles' );
	add_editor_style( 'assets/css/main.css' );

	register_nav_menus( array(
		'primary' => esc_html__( 'Menu Principal', 'starter-theme' ),
		'footer'  => esc_html__( 'Menu Rodapé', 'starter-theme' ),
	) );
}
add_action( 'after_setup_theme', 'starter_theme_setup' );

/**
 * Registra áreas de widgets.
 *
 * @return void
 */
function starter_theme_widgets_init(): void {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar Principal', 'starter-theme' ),
		'id'            => 'sidebar-1',
		'description'   => esc_html__( 'Widgets exibidos na barra lateral.', 'starter-theme' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );

	register_sidebar( array(
		'name'          => esc_html__( 'Rodapé', 'starter-theme' ),
		'id'            => 'footer-1',
		'description'   => esc_html__( 'Widgets exibidos no rodapé.', 'starter-theme' ),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h3 class="widget-title">',
		'after_title'   => '</h3>',
	) );
}
add_action( 'widgets_init', 'starter_theme_widgets_init' );

/**
 * Enfileira estilos e scripts do tema.
 *
 * @return void
 */
function starter_theme_enqueue_assets(): void {
	wp_enqueue_style(
		'starter-theme-main',
		STARTER_THEME_URI . '/assets/css/main.css',
		array(),
		STARTER_THEME_VERSION
	);
}
add_action( 'wp_enqueue_scripts', 'starter_theme_enqueue_assets' );

/**
 * Remove estilos padrão do WordPress/Gutenberg no front-end
 * para que o reset e os estilos do tema prevaleçam.
 *
 * @return void
 */
function starter_theme_dequeue_wp_styles(): void {
	wp_dequeue_style( 'wp-block-library' );
	wp_dequeue_style( 'wp-block-library-theme' );
	wp_dequeue_style( 'wc-blocks-style' );
	wp_dequeue_style( 'classic-theme-styles' );
	wp_dequeue_style( 'global-styles' );
}
add_action( 'wp_enqueue_scripts', 'starter_theme_dequeue_wp_styles', 100 );

/**
 * Impede a injeção de CSS global do WordPress (theme.json) no front-end.
 *
 * @return void
 */
function starter_theme_remove_global_styles(): void {
	remove_action( 'wp_enqueue_scripts', 'wp_enqueue_global_styles' );
	remove_action( 'wp_footer', 'wp_enqueue_global_styles', 1 );
}
add_action( 'after_setup_theme', 'starter_theme_remove_global_styles' );

/**
 * Carrega widgets customizados do tema.
 *
 * @return void
 */
function starter_theme_load_widgets(): void {
	$widget_file = STARTER_THEME_DIR . '/inc/widgets/class-starter-recent-posts-widget.php';

	if ( file_exists( $widget_file ) ) {
		require_once $widget_file;
		register_widget( 'Starter_Recent_Posts_Widget' );
	}
}
add_action( 'widgets_init', 'starter_theme_load_widgets' );
