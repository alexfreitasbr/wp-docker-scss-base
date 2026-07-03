<?php
/**
 * Widget: Posts Recentes do Starter Theme.
 *
 * @package StarterTheme
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Widget customizado que exibe os posts mais recentes.
 */
class Starter_Recent_Posts_Widget extends WP_Widget {

	/**
	 * Registra o widget.
	 */
	public function __construct() {
		parent::__construct(
			'starter_recent_posts',
			esc_html__( 'Posts Recentes (Starter)', 'starter-theme' ),
			array( 'description' => esc_html__( 'Exibe uma lista dos posts mais recentes.', 'starter-theme' ) )
		);
	}

	/**
	 * Renderiza o widget no front-end.
	 *
	 * @param array<string, string> $args     Argumentos de exibição.
	 * @param array<string, mixed>  $instance Configurações salvas.
	 * @return void
	 */
	public function widget( $args, $instance ): void {
		$title  = ! empty( $instance['title'] ) ? $instance['title'] : esc_html__( 'Posts Recentes', 'starter-theme' );
		$number = ! empty( $instance['number'] ) ? absint( $instance['number'] ) : 5;

		$recent_posts = new WP_Query( array(
			'posts_per_page'      => $number,
			'no_found_rows'       => true,
			'ignore_sticky_posts' => true,
		) );

		if ( ! $recent_posts->have_posts() ) {
			return;
		}

		echo $args['before_widget']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

		echo $args['before_title'] . esc_html( $title ) . $args['after_title']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

		echo '<ul class="starter-recent-posts">';

		while ( $recent_posts->have_posts() ) {
			$recent_posts->the_post();
			echo '<li><a href="' . esc_url( get_permalink() ) . '">' . esc_html( get_the_title() ) . '</a></li>';
		}

		echo '</ul>';

		wp_reset_postdata();

		echo $args['after_widget']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}

	/**
	 * Renderiza o formulário de configuração no admin.
	 *
	 * @param array<string, mixed> $instance Configurações atuais.
	 * @return void
	 */
	public function form( $instance ): void {
		$title  = ! empty( $instance['title'] ) ? $instance['title'] : '';
		$number = ! empty( $instance['number'] ) ? absint( $instance['number'] ) : 5;
		?>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>">
				<?php esc_html_e( 'Título:', 'starter-theme' ); ?>
			</label>
			<input
				class="widefat"
				id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"
				name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>"
				type="text"
				value="<?php echo esc_attr( $title ); ?>"
			>
		</p>
		<p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'number' ) ); ?>">
				<?php esc_html_e( 'Quantidade de posts:', 'starter-theme' ); ?>
			</label>
			<input
				class="tiny-text"
				id="<?php echo esc_attr( $this->get_field_id( 'number' ) ); ?>"
				name="<?php echo esc_attr( $this->get_field_name( 'number' ) ); ?>"
				type="number"
				min="1"
				max="20"
				value="<?php echo esc_attr( $number ); ?>"
			>
		</p>
		<?php
	}

	/**
	 * Salva as configurações do widget.
	 *
	 * @param array<string, mixed> $new_instance Novas configurações.
	 * @param array<string, mixed> $old_instance Configurações anteriores.
	 * @return array<string, mixed>
	 */
	public function update( $new_instance, $old_instance ): array {
		$instance           = array();
		$instance['title']  = sanitize_text_field( $new_instance['title'] ?? '' );
		$instance['number'] = absint( $new_instance['number'] ?? 5 );

		return $instance;
	}
}
