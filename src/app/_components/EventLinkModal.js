import PropTypes from 'prop-types';
import { QRCodeSVG } from 'qrcode.react';
import { Modal } from '@components/Modal';
import { PillButton } from '@components/PillButton';
import { Heading, Paragraph } from '@components/Typography';

export function EventLinkModal({ isOpen, onClose, link }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="bg-primary-200">
      <div className="flex flex-col items-center gap-6 px-[72px] pb-12 pt-3 lg:w-[744px]">
        <Heading type="h3" className="text-center font-bold">
          Скануй посилання, щоб переглянути подію
        </Heading>
        <a className="block w-fit" href={link} target="_blank" rel="noopener noreferrer">
          <QRCodeSVG size={204} value={link} />
        </a>
        <div className="flex w-full flex-col items-center gap-3">
          <Paragraph type="p2" className="text-center">
            або
          </Paragraph>
          <a className="block w-full" href={link} target="_blank" rel="noopener noreferrer">
            <PillButton variant="filled" colorVariant="blue" className="w-full" aria-label="Перейти за лінком">
              <Paragraph type="p3" className="text-center text-other-white">
                Перейти за лінком
              </Paragraph>
            </PillButton>
          </a>
        </div>
      </div>
    </Modal>
  );
}

EventLinkModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired,
};
