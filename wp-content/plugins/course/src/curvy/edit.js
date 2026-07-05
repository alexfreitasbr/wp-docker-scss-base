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
import { useBlockProps, InspectorControls, InnerBlocks} from "@wordpress/block-editor";
import {
	PanelBody,
	PanelRow,
	ToggleControl,
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
import CurveTopSettings from "./components/topCurveSettings";
import CurveBottomSettings from "./components/bottomCurveSettings";
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
					position: "unset",
    				height: `${attributes.topCurvyHeight + attributes.bottomCurvyHeight}px`,
				}}
			>
				{attributes.showTopCurvy && (
					<Curvy
						color={attributes.style.color.background}
						width={attributes.topCurvyWidth}
						height={attributes.topCurvyHeight}
						horizontalFlip={attributes.topHorizontalFlip}
						verticalFlip={attributes.topVerticalFlip}
						curvyColor={attributes.topCurvyColor}
					/>
				)}
				<InnerBlocks/>
				{attributes.showBottomCurvy && (
					<Curvy
						top={attributes.topCurvyHeight}
						color={attributes.style.color.background}
						width={attributes.bottomCurvyWidth}
						height={attributes.bottomCurvyHeight}
						horizontalFlip={attributes.bottomHorizontalFlip}
						verticalFlip={attributes.bottomVerticalFlip}
						curvyColor={attributes.bottomCurvyColor}
					/>
				)}
			</section>
			<section>
			<InspectorControls group="settings" className="curvy-inspector">
				<PanelBody
					className="panel-body"
					title={__("Top Curvy Settings", metadata.textdomain)}
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
					{attributes.showTopCurvy && (<CurveTopSettings attributes={attributes} setAttributes={setAttributes} />)}
				</PanelBody>
				<PanelBody
					className="panel-body"
					title={__("BottomCurvy Settings", metadata.textdomain)}
					initialOpen={attributes.showBottomCurvy}
				>
					<PanelRow className="panel-row">
						<ToggleControl
							label={__("Show Bottom Curvy", metadata.textdomain)}
							checked={attributes.showBottomCurvy}
							onChange={(isChecked) =>
								setAttributes({ showBottomCurvy: isChecked })
							}
						/>
					</PanelRow>
					{attributes.showBottomCurvy && (<CurveBottomSettings attributes={attributes} setAttributes={setAttributes} />)}
				</PanelBody>
			</InspectorControls>
			</section>
		</>
	);
}
