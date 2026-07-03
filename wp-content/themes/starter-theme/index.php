<?php
/**
 * Template principal.
 *
 * @package StarterTheme
 */

get_header();
?>

<div class="content-area">
	<?php if ( have_posts() ) : ?>
		<?php while ( have_posts() ) : ?>
			<?php the_post(); ?>

			<article id="post-<?php the_ID(); ?>" <?php post_class( 'post' ); ?>>
				<header class="post__header">
					<?php the_title( '<h1 class="post__title">', '</h1>' ); ?>
					<div class="post__meta">
						<time datetime="<?php echo esc_attr( get_the_date( DATE_W3C ) ); ?>">
							<?php echo esc_html( get_the_date() ); ?>
						</time>
					</div>
				</header>

				<?php if ( has_post_thumbnail() ) : ?>
					<figure class="post__thumbnail">
						<?php the_post_thumbnail( 'large' ); ?>
					</figure>
				<?php endif; ?>

				<div class="post__content">
					<?php the_content(); ?>
				</div>
			</article>

		<?php endwhile; ?>

		<?php the_posts_navigation(); ?>

	<?php else : ?>
		<section class="no-results">
			<h1><?php esc_html_e( 'Nenhum conteúdo encontrado', 'starter-theme' ); ?></h1>
			<p><?php esc_html_e( 'Parece que não há nada aqui ainda.', 'starter-theme' ); ?></p>
		</section>
	<?php endif; ?>
</div>

<?php
get_sidebar();
get_footer();
