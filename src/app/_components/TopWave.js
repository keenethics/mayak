import PropTypes from 'prop-types';
import { cn } from '@utils/cn';

const clipPath =
  'polygon(16.736% 100%,16.736% 100%,14.225% 98.016%,11.856% 92.543%,9.647% 84.302%,7.613% 74.01%,5.771% 62.388%,4.137% 50.155%,2.726% 38.03%,1.556% 26.732%,0.642% 16.982%,0% 9.498%,0% 0%,100% 0%,100% 75.926%,100% 75.926%,99.965% 75.255%,99.842% 73.391%,99.603% 70.56%,99.221% 66.987%,98.667% 62.897%,97.915% 58.517%,96.936% 54.071%,95.702% 49.785%,94.186% 45.883%,92.361% 42.593%,92.361% 42.593%,89.977% 40.601%,87.746% 41.437%,85.647% 44.485%,83.656% 49.126%,81.751% 54.746%,79.908% 60.726%,78.105% 66.451%,76.319% 71.304%,74.528% 74.668%,72.708% 75.926%,72.708% 75.926%,70.738% 74.066%,68.531% 69.018%,66.119% 61.578%,63.532% 52.543%,60.801% 42.712%,57.958% 32.881%,55.033% 23.846%,52.057% 16.406%,49.061% 11.358%,46.076% 9.498%,46.076% 9.498%,43.504% 12.032%,40.548% 18.91%,37.324% 29.046%,33.944% 41.355%,30.521% 54.749%,27.169% 68.143%,24.001% 80.452%,21.131% 90.588%,18.671% 97.466%, 16.736% 100%);';
export function TopWave({ className }) {
  return <div style={{ clipPath }} className={cn('h-[50px]', className)}></div>;
}

TopWave.propTypes = {
  className: PropTypes.string,
};