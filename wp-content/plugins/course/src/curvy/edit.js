/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import {
	PanelBody,
	PanelRow,
	ToggleControl,
	HorizontalRule,
	RangeControl,
} from "@wordpress/components";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";
import metadata from "./block.json";
import Curvy from "./components/curvy";
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps({ className: "max-width-full" });

	return (
		<>
			<section
				{...blockProps}
				style={{
					width: "100%",
					height: `${attributes.curvyHeight}px`,
					backgroundColor: attributes.style.color.background,
				}}
			>
				{attributes.showTopCurvy && (
					<Curvy
						width={attributes.curvyWidth}
						height={attributes.curvyHeight}
						horizontalFlip={attributes.topHorizontalFlip}
						verticalFlip={attributes.topVerticalFlip}
					/>
				)}
			</section>
			<InspectorControls group="settings" className="curvy-inspector">
				<PanelBody
					className="panel-body"
					title={__("Curvy Settings", metadata.textdomain)}
					initialOpen={attributes.showTopCurvy}
				>
					<PanelRow className="panel-row">
						<ToggleControl
							label={__("Show Top Curvy", metadata.textdomain)}
							checked={attributes.showTopCurvy}
							onChange={(isChecked) =>
								setAttributes({ showTopCurvy: isChecked })
							}
						/>
					</PanelRow>
					<HorizontalRule />
					{attributes.showTopCurvy && (
						<PanelRow className="panel-row">
							<RangeControl
								className="curvy-range-control"
								label={__("Curvy width", metadata.textdomain)}
								value={attributes.curvyWidth}
								onChange={(value) => setAttributes({ curvyWidth: value })}
								min={100}
								max={300}
							/>
						</PanelRow>
					)}
					<PanelRow className="panel-row">
						<RangeControl
							className="curvy-range-control"
							label={__("Curvy Height", metadata.textdomain)}
							value={attributes.curvyHeight}
							onChange={(value) => setAttributes({ curvyHeight: value })}
							min={0}
							max={200}
						/>
					</PanelRow>
					<PanelRow className="panel-row">
						<ToggleControl
							label={ __( 'Horizontal flip', metadata.textdomain ) }
							checked={ attributes.topHorizontalFlip}
							onChange={ ( isChecked ) =>
								setAttributes( { topHorizontalFlip: isChecked } )
							}
						/>
					</PanelRow>
					<HorizontalRule />
					<PanelRow className="panel-row">
						<ToggleControl
							label={ __( 'Vertical flip', metadata.textdomain ) }
							checked={ attributes.topVerticalFlip}
							onChange={ ( isChecked ) =>
								setAttributes( { topVerticalFlip: isChecked } )
							}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
