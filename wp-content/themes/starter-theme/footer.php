<?php
/**
 * Rodapé do tema.
 *
 * @package StarterTheme
 */
?>

</main>

<footer class="site-footer" role="contentinfo">
	<div class="site-footer__inner">
		<?php if ( is_active_sidebar( 'footer-1' ) ) : ?>
			<div class="site-footer__widgets">
				<?php dynamic_sidebar( 'footer-1' ); ?>
			</div>
		<?php endif; ?>

		<p class="site-footer__copy">
			&copy; <?php echo esc_html( gmdate( 'Y' ) ); ?>
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php bloginfo( 'name' ); ?></a>
		</p>
	</div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
