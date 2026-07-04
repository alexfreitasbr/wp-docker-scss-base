/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	BoxControl,
	PanelBody,
	PanelRow,
	ToggleControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import metadata from './block.json';
import Curvy from './components/curvy';
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps( { className: 'max-width-full' } );
	const padding = attributes.style?.spacing?.padding;

	const setPadding = ( nextPadding ) => {
		setAttributes( {
			style: {
				...attributes.style,
				spacing: {
					...attributes.style?.spacing,
					padding: nextPadding,
				},
			},
		} );
	};

	return (
		<>
		<section { ...blockProps }>
			{ attributes.showTopCurvy && <Curvy /> }
		</section>
			<InspectorControls group="settings" className="curvy-inspector">
				<PanelBody
					className="panel-body"
					title={ __( 'Curvy Settings', metadata.textdomain ) }
					initialOpen={ attributes.showTopCurvy }
				>
					<PanelRow className="panel-row">
						<ToggleControl
							label={ __( 'Show Top Curvy', metadata.textdomain ) }
							checked={ attributes.showTopCurvy }
							onChange={ ( isChecked ) =>
								setAttributes( { showTopCurvy: isChecked } )
							}
						/>
					</PanelRow>
					<Divider />
					<PanelRow className="panel-row">
						<BoxControl
							className="padding-control"
							label={ __( 'Padding', metadata.textdomain ) }
							values={ padding }
							onChange={ setPadding }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			</>
	);
}	
