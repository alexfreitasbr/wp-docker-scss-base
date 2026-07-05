import {
	PanelRow,
	ToggleControl,
	HorizontalRule,
	RangeControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import metadata from "../block.json";
import { ColorPalette } from "@wordpress/block-editor";

export default function BottomCurveSettings({ attributes, setAttributes }) {
	return (
		<>
			<HorizontalRule />
			{attributes.showBottomCurvy && (
				<PanelRow className="panel-row">
					<RangeControl
						className="curvy-range-control"
						label={__("Curvy width", metadata.textdomain)}
						value={attributes.bottomCurvyWidth}
						onChange={(value) => setAttributes({ bottomCurvyWidth: value })}
						min={100}
						max={300}
					/>
				</PanelRow>
			)}
			<PanelRow className="panel-row">
				<RangeControl
					className="curvy-range-control"
					label={__("Curvy Height", metadata.textdomain)}
					value={attributes.bottomCurvyHeight}
					onChange={(value) => setAttributes({ bottomCurvyHeight: value })}
					min={0}
					max={200}
				/>
			</PanelRow>
			<PanelRow className="panel-row">
				<ToggleControl
					label={__("Horizontal flip", metadata.textdomain)}
					checked={attributes.bottomHorizontalFlip}
					onChange={(isChecked) =>
						setAttributes({ bottomHorizontalFlip: isChecked })
					}
				/>
			</PanelRow>
			<HorizontalRule />
			<PanelRow className="panel-row">
				<ToggleControl
					label={__("Vertical flip", metadata.textdomain)}
					checked={attributes.bottomVerticalFlip}
					onChange={(isChecked) =>
						setAttributes({ bottomVerticalFlip: isChecked })
					}
				/>
			</PanelRow>
			<HorizontalRule />
			<PanelRow className="panel-row">
				<ColorPalette
					label={__("Curvy Color", metadata.textdomain)}
					value={attributes.bottomCurvyColor}
					onChange={(value) => setAttributes({ bottomCurvyColor: value })}
					colors={[
						{ color: "#000000", name: "Black" },
						{ color: "#ffffff", name: "White" },
						{ color: "#ff0000", name: "Red" },
						{ color: "#00ff00", name: "Green" },
						{ color: "#0000ff", name: "Blue" },
					]}
				/>
			</PanelRow>
		</>
	);
}
