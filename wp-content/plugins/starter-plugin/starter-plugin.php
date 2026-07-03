<?php
/**
 * Plugin Name: Starter Plugin
 * Plugin URI: https://example.com
 * Description: Plugin de exemplo para desenvolvimento customizado.
 * Version: 1.0.0
 * Author: Desenvolvedor
 * Author URI: https://example.com
 * Text Domain: starter-plugin
 * Requires at least: 6.0
 * Requires PHP: 8.0
 *
 * @package StarterPlugin
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'STARTER_PLUGIN_VERSION', '1.0.0' );
define( 'STARTER_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'STARTER_PLUGIN_URI', plugin_dir_url( __FILE__ ) );

/**
 * Inicializa o plugin.
 *
 * @return void
 */
function starter_plugin_init(): void {
	// Adicione hooks, shortcodes e funcionalidades aqui.
}
add_action( 'plugins_loaded', 'starter_plugin_init' );

/**
 * Shortcode de exemplo: [starter_hello name="Mundo"]
 *
 * @param array<string, string>|string $atts Atributos do shortcode.
 * @return string
 */
function starter_plugin_hello_shortcode( $atts ): string {
	$atts = shortcode_atts( array(
		'name' => 'Mundo',
	), $atts, 'starter_hello' );

	return '<p class="starter-hello">Olá, ' . esc_html( $atts['name'] ) . '!</p>';
}
add_shortcode( 'starter_hello', 'starter_plugin_hello_shortcode' );
