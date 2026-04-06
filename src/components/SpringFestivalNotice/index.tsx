/**
 * 春节更新通知弹窗组件
 */
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

const NOTICE_KEY = "futurex_spring_festival_2026_notice_dismissed";

export const SpringFestivalNotice: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // 检查用户是否已经关闭过此通知
    const isDismissed = localStorage.getItem(NOTICE_KEY);
    if (!isDismissed) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // 记录用户已关闭通知
    localStorage.setItem(NOTICE_KEY, "true");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="2xl"
      placement="center"
      backdrop="blur"
      classNames={{
        backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        base: "border-[#292f46] bg-white",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 text-2xl font-bold text-center">
          🎊 FutureX Spring Festival Update Notice
        </ModalHeader>
        <ModalBody className="text-base leading-relaxed">
          <p>
            Thank you for your continuous attention to FutureX! As the 2026 Chinese Spring Festival holiday approaches, we announce the temporary update suspension and key schedule arrangements as follows:
          </p>

          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 my-2 rounded">
            <p className="font-semibold text-orange-800">
              📅 Suspension Period: <span className="text-red-600">Feb 11 – Feb 25, 2026</span> (2 weeks)
            </p>
          </div>

          <div className="space-y-3 ml-4">
            <p>
              <span className="font-semibold">📊 Latest Leaderboard:</span> To be updated around Feb 13, 2026 as scheduled
            </p>
            <p>
              <span className="font-semibold">🔄 Resume & New Questions:</span> New prediction questions will be released on Feb 26, 2026, with all regular updates resuming the same day.
            </p>
          </div>

          <p className="text-gray-600 italic mt-4">
            We apologize for any inconvenience caused and appreciate your understanding.
          </p>

          <p className="text-center font-semibold text-lg mt-2">
            🎉 Wishing you a joyful Spring Festival! 🧧
          </p>

          <p className="text-right text-gray-700 mt-3">
            — The FutureX Team
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" variant="solid" onPress={handleClose} className="w-full">
            Got it
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
