import clsx from "clsx";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";

import locale from "../locale/en.json";
import ContentStatus from "../components/content-status";

export function getPaymentStatus(status: string, className?: string) {
  switch (status) {
    case locale.pending: {
      return (
        <ContentStatus
          text={locale.pending}
          className={clsx(className ? className : "bg-slate-500")}
          icon={MdAccessTimeFilled}
        />
      );
    }
    case locale.complete: {
      return (
        <ContentStatus
          text={locale.complete}
          className="bg-green-500 text-green-200"
          icon={MdDone}
        />
      );
    }
    default:
      return null;
  }
}

export function getDeliveryStatus(status: string, className?: string) {
  switch (status) {
    case locale.pending: {
      return (
        <ContentStatus
          text={locale.pending}
          className={clsx(className ? className : "bg-slate-500")}
          icon={MdAccessTimeFilled}
        />
      );
    }
    case locale.delivered: {
      return (
        <ContentStatus
          text={locale.delivered}
          className="bg-green-500 text-green-200"
          icon={MdDone}
        />
      );
    }
    case locale.dispatched: {
      return (
        <ContentStatus
          text={locale.dispatched}
          className="bg-indigo-500 text-indigo-200"
          icon={MdDeliveryDining}
        />
      );
    }
    default:
      return null;
  }
}
